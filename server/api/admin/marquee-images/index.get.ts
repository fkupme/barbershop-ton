import { db } from '~/server/database/db';
import { requireAuth } from '~/server/utils/auth';

export default defineEventHandler(async event => {
	// Проверяем авторизацию
	requireAuth(event);

	try {
		const images = await db
			.selectFrom('marquee_images')
			.selectAll()
			.orderBy('sort_order', 'asc')
			.orderBy('id', 'desc')
			.execute();

		return {
			success: true,
			data: images,
		};
	} catch (error) {
		console.error('Ошибка получения изображений marquee:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при получении изображений',
		});
	}
});
