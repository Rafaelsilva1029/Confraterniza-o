import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

const app = express();

// Configure body parser with larger size limit for file uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// OAuth callback under /api/oauth/callback
registerOAuthRoutes(app);

// tRPC API
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// development mode uses Vite, production mode uses static files
if (process.env.NODE_ENV === "development") {
  const server = createServer(app);
  setupVite(app, server).then(() => {
    const preferredPort = parseInt(process.env.PORT || "3000");
    const port = preferredPort; // Simplificado para o ambiente de desenvolvimento
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
    });
  });
} else {
  serveStatic(app);
}

// Exporta o app para ser usado pela Vercel como Serverless Function
export default app;
