import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface ReportData {
  title: string;
  employees: Array<{
    id: number;
    nome: string;
    valor_contribuicao: number;
    status: 'Pago' | 'Pendente' | 'Aguardando Alvará';
  }>;
  totalCollected: number;
  totalPendingValue: number;
  totalExpenses: number;
  balance: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount / 100);
};

/**
 * Gera um PDF a partir de um elemento HTML
 */
export async function generatePdfFromElement(element: HTMLElement, filename: string): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= 297; // A4 height in mm

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Falha ao gerar PDF');
  }
}

/**
 * Gera um PDF com relatório de arrecadação
 */
export function generateReportPdf(data: ReportData): void {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Cores
  const primaryColor = [51, 65, 85]; // indigo-900
  const successColor = [34, 197, 94]; // green-500
  const warningColor = [234, 179, 8]; // yellow-500
  const errorColor = [239, 68, 68]; // red-500

  // Cabeçalho
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, pageWidth, 30, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.title, margin, 15);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, margin, 25);

  yPosition = 40;

  // Resumo Financeiro
  pdf.setFillColor(240, 240, 240);
  pdf.rect(margin, yPosition, contentWidth, 8, 'F');

  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RESUMO FINANCEIRO', margin + 5, yPosition + 6);

  yPosition += 12;

  // Cards de resumo
  const cardWidth = (contentWidth - 6) / 2;
  const cardHeight = 20;

  const cards = [
    {
      title: 'Total Arrecadado',
      value: formatCurrency(data.totalCollected),
      color: successColor,
    },
    {
      title: 'Valor Pendente',
      value: formatCurrency(data.totalPendingValue),
      color: warningColor,
    },
    {
      title: 'Total de Despesas',
      value: formatCurrency(data.totalExpenses),
      color: errorColor,
    },
    {
      title: 'Saldo Atual',
      value: formatCurrency(data.balance),
      color: data.balance >= 0 ? successColor : errorColor,
    },
  ];

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const xPos = margin + (i % 2) * (cardWidth + 3);
    const yPos = yPosition + Math.floor(i / 2) * (cardHeight + 3);

    pdf.setFillColor(...card.color);
    pdf.rect(xPos, yPos, cardWidth, cardHeight, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(card.title, xPos + 3, yPos + 6);

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(card.value, xPos + 3, yPos + 14);
  }

  yPosition += 45;

  // Tabela de Funcionários
  pdf.setFillColor(240, 240, 240);
  pdf.rect(margin, yPosition, contentWidth, 8, 'F');

  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DETALHE POR FUNCIONÁRIO', margin + 5, yPosition + 6);

  yPosition += 10;

  // Cabeçalho da tabela
  pdf.setFillColor(51, 65, 85);
  pdf.rect(margin, yPosition, contentWidth, 7, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');

  const colWidths = [contentWidth * 0.4, contentWidth * 0.25, contentWidth * 0.35];
  let xPos = margin;

  pdf.text('Nome', xPos + 2, yPosition + 5);
  xPos += colWidths[0];
  pdf.text('Valor', xPos + 2, yPosition + 5);
  xPos += colWidths[1];
  pdf.text('Status', xPos + 2, yPosition + 5);

  yPosition += 8;

  // Linhas da tabela
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');

  const sortedEmployees = [...data.employees].sort((a, b) => {
    if (a.status === 'Pago' && b.status !== 'Pago') return -1;
    if (a.status !== 'Pago' && b.status === 'Pago') return 1;
    return a.nome.localeCompare(b.nome);
  });

  for (const employee of sortedEmployees) {
    if (yPosition > pageHeight - 20) {
      pdf.addPage();
      yPosition = margin;
    }

    // Alternância de cores
    if (sortedEmployees.indexOf(employee) % 2 === 0) {
      pdf.setFillColor(245, 245, 245);
      pdf.rect(margin, yPosition, contentWidth, 6, 'F');
    }

    xPos = margin;
    pdf.text(employee.nome.substring(0, 25), xPos + 2, yPosition + 4);
    xPos += colWidths[0];
    pdf.text(formatCurrency(employee.valor_contribuicao), xPos + 2, yPosition + 4);
    xPos += colWidths[1];
    pdf.text(employee.status, xPos + 2, yPosition + 4);

    yPosition += 6;
  }

  // Rodapé
  yPosition += 5;
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text(
    `Relatório gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`,
    margin,
    yPosition
  );

  // Salvar PDF
  pdf.save(`relatorio-confraternizacao-${new Date().getTime()}.pdf`);
}

/**
 * Exporta dados para CSV
 */
export function exportToCsv(data: ReportData): void {
  let csv = 'RELATÓRIO DE ARRECADAÇÃO\n';
  csv += `Data: ${new Date().toLocaleDateString('pt-BR')}\n\n`;

  csv += 'RESUMO FINANCEIRO\n';
  csv += `Total Arrecadado,${formatCurrency(data.totalCollected)}\n`;
  csv += `Valor Pendente,${formatCurrency(data.totalPendingValue)}\n`;
  csv += `Total de Despesas,${formatCurrency(data.totalExpenses)}\n`;
  csv += `Saldo Atual,${formatCurrency(data.balance)}\n\n`;

  csv += 'DETALHE POR FUNCIONÁRIO\n';
  csv += 'Nome,Valor,Status\n';

  for (const employee of data.employees) {
    csv += `${employee.nome},${formatCurrency(employee.valor_contribuicao)},${employee.status}\n`;
  }

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `relatorio-confraternizacao-${new Date().getTime()}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
