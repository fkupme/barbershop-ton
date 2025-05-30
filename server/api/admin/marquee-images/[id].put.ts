import { db } from '~/server/database/db';
import { requireAuth } from '~/server/utils/auth';

export default defineEventHandler(async event => {
	// Проверяем авторизацию
	requireAuth(event);

	const id = getRouterParam(event, 'id');
	const body = await readBody(event);

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'ID изображения обязателен',
		});
	}

	const { image_url, alt_text, is_active, sort_order } = body;

	if (!image_url) {
		throw createError({
			statusCode: 400,
			statusMessage: 'URL изображения обязателен',
		});
	}

	try {
		const updatedImage = await db
			.updateTable('marquee_images')
			.set({
				image_url,
				alt_text: alt_text || '',
				is_active: is_active !== undefined ? is_active : true,
				sort_order: sort_order !== undefined ? sort_order : 0,
				updated_at: new Date().toISOString(),
			})
			.where('id', '=', parseInt(id))
			.returningAll()
			.executeTakeFirstOrThrow();

		return {
			success: true,
			data: updatedImage,
		};
	} catch (error) {
		console.error('Ошибка обновления изображения:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при обновлении изображения',
		});
	}
});
