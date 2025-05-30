import { db } from '~/server/database/db';
import { requireAuth } from '~/server/utils/auth';

export default defineEventHandler(async event => {
	// Проверяем авторизацию
	requireAuth(event);

	const body = await readBody(event);

	const { image_url, alt_text, is_active = true, sort_order = 0 } = body;

	if (!image_url) {
		throw createError({
			statusCode: 400,
			statusMessage: 'URL изображения обязателен',
		});
	}

	try {
		console.log('Попытка создания marquee изображения:', {
			image_url,
			alt_text,
			is_active,
			sort_order,
		});

		// Простой INSERT без returning
		const insertResult = await db
			.insertInto('marquee_images')
			.values({
				image_url,
				alt_text: alt_text || '',
				is_active: is_active ? 1 : 0,
				sort_order: Number(sort_order),
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			})
			.execute();

		console.log('INSERT выполнен, insertResult:', insertResult);

		// Получаем созданную запись отдельно
		const newImage = await db
			.selectFrom('marquee_images')
			.selectAll()
			.where('id', '=', insertResult[0].insertId)
			.executeTakeFirst();

		console.log('Marquee изображение создано успешно:', newImage);

		return {
			success: true,
			data: newImage,
		};
	} catch (error) {
		console.error('Детальная ошибка создания изображения:', error);
		console.error('Stack trace:', error.stack);
		console.error('Error message:', error.message);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при создании изображения: ' + error.message,
		});
	}
});
