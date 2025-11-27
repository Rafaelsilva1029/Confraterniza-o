/**
 * Google Maps API Integration - DESATIVADO
 * 
 * Este módulo foi desativado pois o aplicativo não possui autenticação
 * e não requer integração com Google Maps.
 */

export async function makeRequest<T = unknown>(
  endpoint: string,
  params: Record<string, unknown> = {},
  options: { method?: "GET" | "POST"; body?: Record<string, unknown> } = {}
): Promise<T> {
  throw new Error("Google Maps integration is disabled in this public application");
}
