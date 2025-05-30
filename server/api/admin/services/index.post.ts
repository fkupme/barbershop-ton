import { db } from '~/server/database/db';
import { requireAuth } from '~/server/utils/auth';

export default defineEventHandler(async event => {
	// Проверяем авторизацию
	requireAuth(event);

	const body = await readBody(event);

	const {
		title,
		description,
		category,
		category_name,
		price,
		duration,
		is_active = true,
		sort_order = 0,
	} = body;

	if (!title || !category || !category_name || !price) {
		throw createError({
			statusCode: 400,
			statusMessage:
				'Название, категория, название категории и цена обязательны',
		});
	}

	try {
		console.log('Попытка создания услуги:', {
			title,
			category,
			category_name,
			price,
			is_active,
			sort_order,
		});

		// Простой INSERT без returning
		const insertResult = await db
			.insertInto('services')
			.values({
				title,
				description: description || '',
				category,
				category_name,
				price: Number(price),
				duration: duration ? Number(duration) : null,
				is_active: is_active ? 1 : 0,
				sort_order: Number(sort_order),
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			})
			.execute();

		console.log('Service INSERT выполнен, insertResult:', insertResult);

		// Получаем созданную запись отдельно
		const newService = await db
			.selectFrom('services')
			.selectAll()
			.where('id', '=', insertResult[0].insertId)
			.executeTakeFirst();

		console.log('Услуга создана успешно:', newService);

		return {
			success: true,
			data: newService,
		};
	} catch (error) {
		console.error('Детальная ошибка создания услуги:', error);
		console.error('Stack trace:', error.stack);
		console.error('Error message:', error.message);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при создании услуги: ' + error.message,
		});
	}
});
