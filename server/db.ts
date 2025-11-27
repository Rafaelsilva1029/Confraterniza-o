import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // PostgreSQL upsert syntax
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// Queries de Funcionários
import { funcionarios, despesas } from "../drizzle/schema";

export async function getFuncionarios() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(funcionarios);
}

export async function createFuncionario(data: { nome: string; valor_contribuicao: number; status: 'Pago' | 'Pendente' | 'Aguardando Alvará' }) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(funcionarios).values(data);
}

export async function updateFuncionario(id: number, data: Partial<{ nome: string; valor_contribuicao: number; status: 'Pago' | 'Pendente' | 'Aguardando Alvará' }>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(funcionarios).set(data).where(eq(funcionarios.id, id));
}

export async function deleteFuncionario(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.delete(funcionarios).where(eq(funcionarios.id, id));
}

// Queries de Despesas
export async function getDespesas() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(despesas);
}

export async function createDespesa(data: { item: string; valor: number; data_compra: string }) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.insert(despesas).values(data);
}

export async function updateDespesa(id: number, data: Partial<{ item: string; valor: number; data_compra: string }>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.update(despesas).set(data).where(eq(despesas.id, id));
}

export async function deleteDespesa(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return db.delete(despesas).where(eq(despesas.id, id));
}
