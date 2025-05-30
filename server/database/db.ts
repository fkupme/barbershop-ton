import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import path from 'path';
import { Database as DatabaseSchema } from './schema';

// Путь к БД файлу
const dbPath = path.join(process.cwd(), '.data', 'barbershop.sqlite');

// Создаем подключение к SQLite
const dialect = new SqliteDialect({
	database: new Database(dbPath),
});

// Экспортируем экземпляр Kysely
export const db = new Kysely<DatabaseSchema>({
	dialect,
});

export type DB = typeof db;
