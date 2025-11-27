import type { Request } from "express";
import type { User } from "../../drizzle/schema";

/**
 * SDK simplificado para aplicativo sem autenticação
 * Todas as funcionalidades de OAuth foram removidas
 */
class SDKServer {
  /**
   * Autenticação desativada - retorna null para todas as requisições
   * O aplicativo é totalmente público sem autenticação
   */
  async authenticateRequest(req: Request): Promise<User | null> {
    return null;
  }
}

export const sdk = new SDKServer();
