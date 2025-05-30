import { db } from '~/server/database/db';
import { requireAuth } from '~/server/utils/auth';

export default defineEventHandler(async event => {
	// Проверяем авторизацию
	requireAuth(event);

	const id = getRouterParam(event, 'id');

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'ID услуги обязателен',
		});
	}

	try {
		await db
			.deleteFrom('services')
			.where('id', '=', parseInt(id))
			.executeTakeFirstOrThrow();

		return {
			success: true,
			message: 'Услуга успешно удалена',
		};
	} catch (error) {
		console.error('Ошибка удаления услуги:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при удалении услуги',
		});
	}
});
