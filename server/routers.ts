import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getAllFuncionarios,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
  getAllDespesas,
  createDespesa,
  updateDespesa,
  deleteDespesa,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  funcionarios: router({
    list: publicProcedure.query(async () => {
      return await getAllFuncionarios();
    }),
    create: publicProcedure
      .input(
        z.object({
          nome: z.string().min(1),
          valor_contribuicao: z.number().positive(),
          status: z.enum(["Pago", "Pendente", "Aguardando Alvará"]).default("Pendente"),
        })
      )
      .mutation(async ({ input }) => {
        const valorEmCentavos = Math.round(input.valor_contribuicao * 100);
        return await createFuncionario({
          nome: input.nome,
          valor_contribuicao: valorEmCentavos,
          status: input.status,
        });
      }),
    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          nome: z.string().min(1).optional(),
          valor_contribuicao: z.number().positive().optional(),
          status: z.enum(["Pago", "Pendente", "Aguardando Alvará"]).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        const updateData: Record<string, unknown> = {};
        if (data.nome) updateData.nome = data.nome;
        if (data.valor_contribuicao) updateData.valor_contribuicao = Math.round(data.valor_contribuicao * 100);
        if (data.status) updateData.status = data.status;
        return await updateFuncionario(id, updateData as any);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await deleteFuncionario(input.id);
      }),
  }),

  despesas: router({
    list: publicProcedure.query(async () => {
      return await getAllDespesas();
    }),
    create: publicProcedure
      .input(
        z.object({
          item: z.string().min(1),
          valor: z.number().positive(),
          data_compra: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const valorEmCentavos = Math.round(input.valor * 100);
        return await createDespesa({
          item: input.item,
          valor: valorEmCentavos,
          data_compra: input.data_compra,
        });
      }),
    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          item: z.string().min(1).optional(),
          valor: z.number().positive().optional(),
          data_compra: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        const updateData: Record<string, unknown> = {};
        if (data.item) updateData.item = data.item;
        if (data.valor) updateData.valor = Math.round(data.valor * 100);
        if (data.data_compra) updateData.data_compra = data.data_compra;
        return await updateDespesa(id, updateData as any);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await deleteDespesa(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
