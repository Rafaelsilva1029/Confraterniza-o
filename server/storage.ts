/**
 * Storage API Integration - DESATIVADO
 * 
 * Este módulo foi desativado pois o aplicativo não possui autenticação
 * e não requer integração com storage de arquivos.
 */

export async function uploadFile(
  relKey: string,
  file: File
): Promise<{ url: string }> {
  throw new Error("Storage integration is disabled in this public application");
}

export async function downloadFile(relKey: string): Promise<Blob> {
  throw new Error("Storage integration is disabled in this public application");
}

export async function deleteFile(relKey: string): Promise<void> {
  throw new Error("Storage integration is disabled in this public application");
}
