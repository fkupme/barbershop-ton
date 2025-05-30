import { db } from '~/server/database/db';

export default defineEventHandler(async () => {
	try {
		const images = await db
			.selectFrom('hero_images')
			.selectAll()
			.where('is_active', '=', 1)
			.orderBy('sort_order', 'asc')
			.orderBy('id', 'desc')
			.execute();

		// Конвертируем boolean поле
		const formattedImages = images.map(image => ({
			...image,
			is_active: Boolean(image.is_active),
		}));

		return {
			success: true,
			data: formattedImages,
		};
	} catch (error) {
		console.error('Ошибка получения hero изображений:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при получении изображений',
		});
	}
});
