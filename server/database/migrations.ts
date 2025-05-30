import bcrypt from 'bcryptjs';
import { db } from './db';

export async function runMigrations() {
	console.log('🚀 Запуск миграций...');

	// Создание таблицы админов
	await db.schema
		.createTable('admins')
		.ifNotExists()
		.addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
		.addColumn('username', 'varchar(50)', col => col.notNull().unique())
		.addColumn('password', 'varchar(255)', col => col.notNull())
		.addColumn('email', 'varchar(100)', col => col.notNull().unique())
		.addColumn('role', 'varchar(20)', col => col.notNull().defaultTo('admin'))
		.addColumn('created_at', 'datetime', col =>
			col.notNull().defaultTo(new Date().toISOString())
		)
		.addColumn('updated_at', 'datetime', col =>
			col.notNull().defaultTo(new Date().toISOString())
		)
		.execute();

	// Создание таблицы продуктов
	await db.schema
		.createTable('products')
		.ifNotExists()
		.addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
		.addColumn('title', 'varchar(255)', col => col.notNull())
		.addColumn('description', 'text')
		.addColumn('image_url', 'varchar(500)')
		.addColumn('category', 'varchar(50)', col => col.notNull())
		.addColumn('category_name', 'varchar(100)', col => col.notNull())
		.addColumn('tags', 'text') // JSON array as string
		.addColumn('price', 'integer') // Цена необязательна для товаров
		.addColumn('is_active', 'boolean', col => col.notNull().defaultTo(true))
		.addColumn('sort_order', 'integer', col => col.notNull().defaultTo(0))
		.addColumn('created_at', 'datetime', col =>
			col.notNull().defaultTo(new Date().toISOString())
		)
		.addColumn('updated_at', 'datetime', col =>
			col.notNull().defaultTo(new Date().toISOString())
		)
		.execute();

	// Создание таблицы услуг
	await db.schema
		.createTable('services')
		.ifNotExists()
		.addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
		.addColumn('title', 'varchar(255)', col => col.notNull())
		.addColumn('description', 'text')
		.addColumn('price', 'integer', col => col.notNull())
		.addColumn('duration', 'integer') // Длительность в минутах
		.addColumn('category', 'varchar(50)', col => col.notNull())
		.addColumn('category_name', 'varchar(100)', col => col.notNull())
		.addColumn('tags', 'text') // JSON array as string
		.addColumn('is_active', 'boolean', col => col.notNull().defaultTo(true))
		.addColumn('sort_order', 'integer', col => col.notNull().defaultTo(0))
		.addColumn('created_at', 'datetime', col =>
			col.notNull().defaultTo(new Date().toISOString())
		)
		.addColumn('updated_at', 'datetime', col =>
			col.notNull().defaultTo(new Date().toISOString())
		)
		.execute();

	// Создание таблицы изображений героя
	await db.schema
		.createTable('hero_images')
		.ifNotExists()
		.addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
		.addColumn('image_url', 'varchar(500)', col => col.notNull())
		.addColumn('alt_text', 'varchar(255)')
		.addColumn('is_active', 'boolean', col => col.notNull().defaultTo(true))
		.addColumn('sort_order', 'integer', col => col.notNull().defaultTo(0))
		.addColumn('created_at', 'datetime', col =>
			col.notNull().defaultTo(new Date().toISOString())
		)
		.addColumn('updated_at', 'datetime', col =>
			col.notNull().defaultTo(new Date().toISOString())
		)
		.execute();

	// Создание таблицы изображений marquee секции
	await db.schema
		.createTable('marquee_images')
		.ifNotExists()
		.addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
		.addColumn('image_url', 'varchar(500)', col => col.notNull())
		.addColumn('alt_text', 'varchar(255)')
		.addColumn('is_active', 'boolean', col => col.notNull().defaultTo(true))
		.addColumn('sort_order', 'integer', col => col.notNull().defaultTo(0))
		.addColumn('created_at', 'datetime', col =>
			col.notNull().defaultTo(new Date().toISOString())
		)
		.addColumn('updated_at', 'datetime', col =>
			col.notNull().defaultTo(new Date().toISOString())
		)
		.execute();

	console.log('✅ Таблицы созданы');

	// Добавляем колонку duration в таблицу services если её нет
	try {
		console.log('⚡ Проверяем колонку duration в таблице services');
		await db.schema
			.alterTable('services')
			.addColumn('duration', 'integer')
			.execute();
		console.log('✅ Колонка duration добавлена');
	} catch (error: any) {
		if (error.message && error.message.includes('duplicate column')) {
			console.log('✅ Колонка duration уже существует');
		} else {
			console.error('Ошибка при добавлении колонки duration:', error);
		}
	}

	// Создание дефолтного админа
	const existingAdmin = await db
		.selectFrom('admins')
		.where('username', '=', 'admin')
		.selectAll()
		.executeTakeFirst();

	if (!existingAdmin) {
		const hashedPassword = await bcrypt.hash('admin123', 10);

		await db
			.insertInto('admins')
			.values({
				username: 'admin',
				password: hashedPassword,
				email: 'admin@barbershop.com',
				role: 'super_admin',
			})
			.execute();

		console.log('✅ Создан дефолтный админ (admin/admin123)');
	}

	console.log('🎉 Миграции завершены!');
}
