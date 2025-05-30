import { db } from '~/server/database/db';
import { requireAuth } from '~/server/utils/auth';

export default defineEventHandler(async event => {
	// Проверяем авторизацию
	requireAuth(event);

	const body = await readBody(event);

	const {
		title,
		description,
		image_url,
		category,
		category_name,
		tags,
		price,
		is_active = true,
		sort_order = 0,
	} = body;

	if (!title || !category || !category_name) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Название, категория и название категории обязательны',
		});
	}

	try {
		console.log('Попытка создания продукта:', {
			title,
			category,
			category_name,
			is_active,
			sort_order,
		});

		// Простой INSERT без returning
		const insertResult = await db
			.insertInto('products')
			.values({
				title,
				description: description || '',
				image_url: image_url || null,
				category,
				category_name,
				tags: JSON.stringify(tags || []),
				price: price || null,
				is_active: is_active ? 1 : 0,
				sort_order: Number(sort_order),
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			})
			.execute();

		console.log('Product INSERT выполнен, insertResult:', insertResult);

		// Получаем созданную запись отдельно
		const newProduct = await db
			.selectFrom('products')
			.selectAll()
			.where('id', '=', insertResult[0].insertId)
			.executeTakeFirst();

		console.log('Продукт создан успешно:', newProduct);

		return {
			success: true,
			data: {
				...newProduct,
				tags: JSON.parse(newProduct.tags || '[]'),
			},
		};
	} catch (error) {
		console.error('Детальная ошибка создания продукта:', error);
		console.error('Stack trace:', error.stack);
		console.error('Error message:', error.message);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при создании продукта: ' + error.message,
		});
	}
});
