/**
 * Image Generation - DESATIVADO
 * 
 * Este módulo foi desativado pois o aplicativo não possui autenticação
 * e não requer integração com geração de imagens.
 */

export type GenerateImageOptions = {
  prompt: string;
  originalImages?: Array<{
    url?: string;
    b64Json?: string;
    mimeType?: string;
  }>;
};

export type GenerateImageResponse = {
  url?: string;
};

export async function generateImage(
  options: GenerateImageOptions
): Promise<GenerateImageResponse> {
  throw new Error("Image generation is disabled in this public application");
}
