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
			statusMessage: 'ID услуги обязателен',
		});
	}

	const {
		title,
		description,
		category,
		category_name,
		price,
		duration,
		is_active,
		sort_order,
	} = body;

	if (!title || !category || !category_name || !price) {
		throw createError({
			statusCode: 400,
			statusMessage:
				'Название, категория, название категории и цена обязательны',
		});
	}

	try {
		const updatedService = await db
			.updateTable('services')
			.set({
				title,
				description: description || '',
				category,
				category_name,
				price,
				duration: duration || null,
				is_active: is_active !== undefined ? is_active : true,
				sort_order: sort_order !== undefined ? sort_order : 0,
				updated_at: new Date().toISOString(),
			})
			.where('id', '=', parseInt(id))
			.returningAll()
			.executeTakeFirstOrThrow();

		return {
			success: true,
			data: updatedService,
		};
	} catch (error) {
		console.error('Ошибка обновления услуги:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при обновлении услуги',
		});
	}
});
