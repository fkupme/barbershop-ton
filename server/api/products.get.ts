import { db } from '~/server/database/db';

export default defineEventHandler(async () => {
	try {
		const products = await db
			.selectFrom('products')
			.selectAll()
			.where('is_active', '=', 1)
			.orderBy('sort_order', 'asc')
			.orderBy('id', 'desc')
			.execute();

		// Парсим JSON теги
		const formattedProducts = products.map(product => ({
			...product,
			tags: product.tags ? JSON.parse(product.tags) : [],
			is_active: Boolean(product.is_active),
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
