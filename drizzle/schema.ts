import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela de funcionários para o controle de pagamentos da confraternização
 */
export const funcionarios = mysqlTable("funcionarios", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  valor_contribuicao: int("valor_contribuicao").notNull(), // Armazenar em centavos (ex: 15000 = R$ 150,00)
  status: mysqlEnum("status", ["Pago", "Pendente", "Aguardando Alvará"]).default("Pendente").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Funcionario = typeof funcionarios.$inferSelect;
export type InsertFuncionario = typeof funcionarios.$inferInsert;

/**
 * Tabela de despesas para o controle de gastos da confraternização
 */
export const despesas = mysqlTable("despesas", {
  id: int("id").autoincrement().primaryKey(),
  item: varchar("item", { length: 255 }).notNull(),
  valor: int("valor").notNull(), // Armazenar em centavos (ex: 450000 = R$ 4500,00)
  data_compra: varchar("data_compra", { length: 10 }).notNull(), // Formato: YYYY-MM-DD
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Despesa = typeof despesas.$inferSelect;
export type InsertDespesa = typeof despesas.$inferInsert;