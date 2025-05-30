import { db } from '~/server/database/db';
import { requireAuth } from '~/server/utils/auth';

export default defineEventHandler(async event => {
	// Проверяем авторизацию
	requireAuth(event);

	try {
		const products = await db
			.selectFrom('products')
			.selectAll()
			.orderBy('sort_order', 'asc')
			.orderBy('id', 'desc')
			.execute();

		// Парсим JSON теги
		const formattedProducts = products.map(product => ({
			...product,
			tags: product.tags ? JSON.parse(product.tags) : [],
		}));

		return {
			success: true,
			data: formattedProducts,
		};
	} catch (error) {
		console.error('Ошибка получения продуктов:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при получении продуктов',
		});
	}
});
