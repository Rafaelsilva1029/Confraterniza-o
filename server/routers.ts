import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getFuncionarios, createFuncionario, updateFuncionario, deleteFuncionario, getDespesas, createDespesa, updateDespesa, deleteDespesa } from "./db";

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
    list: publicProcedure.query(() => getFuncionarios()),
    create: publicProcedure
      .input(z.object({ nome: z.string(), valor_contribuicao: z.number(), status: z.enum(['Pago', 'Pendente', 'Aguardando Alvará']).optional() }))
      .mutation(({ input }) => createFuncionario({ ...input, status: input.status || 'Pendente' })),
    update: publicProcedure
      .input(z.object({ id: z.number(), nome: z.string().optional(), valor_contribuicao: z.number().optional(), status: z.enum(['Pago', 'Pendente', 'Aguardando Alvará']).optional() }))
      .mutation(({ input }) => updateFuncionario(input.id, { nome: input.nome, valor_contribuicao: input.valor_contribuicao, status: input.status })),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteFuncionario(input.id)),
  }),

  despesas: router({
    list: publicProcedure.query(() => getDespesas()),
    create: publicProcedure
      .input(z.object({ item: z.string(), valor: z.number(), data_compra: z.string() }))
      .mutation(({ input }) => createDespesa(input)),
    update: publicProcedure
      .input(z.object({ id: z.number(), item: z.string().optional(), valor: z.number().optional(), data_compra: z.string().optional() }))
      .mutation(({ input }) => updateDespesa(input.id, { item: input.item, valor: input.valor, data_compra: input.data_compra })),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteDespesa(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
