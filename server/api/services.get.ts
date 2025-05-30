import { db } from '~/server/database/db';

export default defineEventHandler(async () => {
	try {
		const services = await db
			.selectFrom('services')
			.selectAll()
			.where('is_active', '=', 1)
			.orderBy('sort_order', 'asc')
			.orderBy('id', 'desc')
			.execute();

		// Конвертируем boolean поле
		const formattedServices = services.map(service => ({
			...service,
			is_active: Boolean(service.is_active),
		}));

		return {
			success: true,
			data: formattedServices,
		};
	} catch (error) {
		console.error('Ошибка получения услуг:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при получении услуг',
		});
	}
});
