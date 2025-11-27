/**
 * Data API - DESATIVADO
 * 
 * Este módulo foi desativado pois o aplicativo não possui autenticação
 * e não requer integração com APIs externas.
 */

export type DataApiCallOptions = {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
  formData?: Record<string, unknown>;
};

export async function callDataApi(
  apiId: string,
  options: DataApiCallOptions = {}
): Promise<unknown> {
  throw new Error("Data API integration is disabled in this public application");
}
