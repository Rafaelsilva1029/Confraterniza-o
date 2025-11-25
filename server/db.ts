import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import type { MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { InsertUser, users, funcionarios, InsertFuncionario, despesas, InsertDespesa } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: MySql2Database | null = null;
let _pool: mysql.Pool | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      if (!_pool) {
        _pool = mysql.createPool(process.env.DATABASE_URL);
      }
      _db = drizzle(_pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
      _pool = null;
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
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
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

/**
 * Obter todos os funcionários
 */
export async function getAllFuncionarios() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get funcionarios: database not available");
    return [];
  }
  try {
    return await db.select().from(funcionarios);
  } catch (error) {
    console.error("[Database] Error getting funcionarios:", error);
    return [];
  }
}

/**
 * Criar novo funcionário
 */
export async function createFuncionario(data: InsertFuncionario) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  try {
    await db.insert(funcionarios).values(data);
    // Retornar o funcionário criado
    const created = await db.select().from(funcionarios).orderBy(funcionarios.id).limit(1);
    return created[0] || { id: 0, ...data };
  } catch (error) {
    console.error("[Database] Error creating funcionario:", error);
    throw error;
  }
}

/**
 * Atualizar funcionário
 */
export async function updateFuncionario(id: number, data: Partial<InsertFuncionario>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  try {
    await db.update(funcionarios).set(data).where(eq(funcionarios.id, id));
    // Retornar o funcionário atualizado
    const result = await db.select().from(funcionarios).where(eq(funcionarios.id, id));
    return result[0] || { id, ...data };
  } catch (error) {
    console.error("[Database] Error updating funcionario:", error);
    throw error;
  }
}

/**
 * Deletar funcionário
 */
export async function deleteFuncionario(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  try {
    await db.delete(funcionarios).where(eq(funcionarios.id, id));
    return { success: true, id };
  } catch (error) {
    console.error("[Database] Error deleting funcionario:", error);
    throw error;
  }
}

/**
 * Obter todas as despesas
 */
export async function getAllDespesas() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get despesas: database not available");
    return [];
  }
  try {
    return await db.select().from(despesas);
  } catch (error) {
    console.error("[Database] Error getting despesas:", error);
    return [];
  }
}

/**
 * Criar nova despesa
 */
export async function createDespesa(data: InsertDespesa) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  try {
    await db.insert(despesas).values(data);
    // Retornar a despesa criada
    const created = await db.select().from(despesas).orderBy(despesas.id).limit(1);
    return created[0] || { id: 0, ...data };
  } catch (error) {
    console.error("[Database] Error creating despesa:", error);
    throw error;
  }
}

/**
 * Atualizar despesa
 */
export async function updateDespesa(id: number, data: Partial<InsertDespesa>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  try {
    await db.update(despesas).set(data).where(eq(despesas.id, id));
    // Retornar a despesa atualizada
    const result = await db.select().from(despesas).where(eq(despesas.id, id));
    return result[0] || { id, ...data };
  } catch (error) {
    console.error("[Database] Error updating despesa:", error);
    throw error;
  }
}

/**
 * Deletar despesa
 */
export async function deleteDespesa(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  try {
    await db.delete(despesas).where(eq(despesas.id, id));
    return { success: true, id };
  } catch (error) {
    console.error("[Database] Error deleting despesa:", error);
    throw error;
  }
}
