import { db } from '~/server/database/db';
import { requireAuth } from '~/server/utils/auth';

export default defineEventHandler(async event => {
	// Проверяем авторизацию
	requireAuth(event);

	try {
		const services = await db
			.selectFrom('services')
			.selectAll()
			.orderBy('sort_order', 'asc')
			.orderBy('id', 'desc')
			.execute();

		return {
			success: true,
			data: services,
		};
	} catch (error) {
		console.error('Ошибка получения услуг:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при получении услуг',
		});
	}
});
