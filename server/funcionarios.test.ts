import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("funcionarios router", () => {
  it("should list funcionarios", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.funcionarios.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should create a funcionario", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.funcionarios.create({
      nome: "João Silva",
      valor_contribuicao: 150,
      status: "Pendente",
    });

    expect(result).toBeDefined();
  });

  it("should validate required fields", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.funcionarios.create({
        nome: "",
        valor_contribuicao: 150,
        status: "Pendente",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should validate positive contribution value", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.funcionarios.create({
        nome: "João Silva",
        valor_contribuicao: -150,
        status: "Pendente",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("despesas router", () => {
  it("should list despesas", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.despesas.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should create a despesa", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.despesas.create({
      item: "Buffet Completo",
      valor: 4500,
      data_compra: "2025-11-20",
    });

    expect(result).toBeDefined();
  });

  it("should validate required fields for despesa", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.despesas.create({
        item: "",
        valor: 4500,
        data_compra: "2025-11-20",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should validate positive expense value", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.despesas.create({
        item: "Buffet Completo",
        valor: -4500,
        data_compra: "2025-11-20",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
