import { db } from '~/server/database/db';
import { requireAuth } from '~/server/utils/auth';

export default defineEventHandler(async event => {
	// Проверяем авторизацию
	requireAuth(event);

	const id = getRouterParam(event, 'id');

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'ID изображения обязателен',
		});
	}

	try {
		await db
			.deleteFrom('hero_images')
			.where('id', '=', parseInt(id))
			.executeTakeFirstOrThrow();

		return {
			success: true,
			message: 'Изображение успешно удалено',
		};
	} catch (error) {
		console.error('Ошибка удаления изображения:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при удалении изображения',
		});
	}
});
