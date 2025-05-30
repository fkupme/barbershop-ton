import { db } from '~/server/database/db';

export default defineEventHandler(async event => {
	try {
		// Дефолтные категории
		const defaultCategories = [
			{
				id: 1,
				code: 'hair',
				name: 'Уход за волосами',
				description: 'Категория Уход за волосами',
			},
			{
				id: 2,
				code: 'beard',
				name: 'Уход за бородой',
				description: 'Категория Уход за бородой',
			},
			{
				id: 3,
				code: 'style',
				name: 'Стрижки',
				description: 'Категория Стрижки',
			},
			{
				id: 4,
				code: 'care',
				name: 'Косметика',
				description: 'Категория Косметика',
			},
		];

		try {
			// Получаем уникальные категории из товаров
			const productCategories = await db
				.selectFrom('products')
				.select(['category as code', 'category_name as name'])
				.where('category', 'is not', null)
				.where('category_name', 'is not', null)
				.groupBy(['category', 'category_name'])
				.execute();

			// Получаем уникальные категории из услуг
			const serviceCategories = await db
				.selectFrom('services')
				.select(['category as code', 'category_name as name'])
				.where('category', 'is not', null)
				.where('category_name', 'is not', null)
				.groupBy(['category', 'category_name'])
				.execute();

			// Объединяем и удаляем дубликаты
			const allCategories = [...productCategories, ...serviceCategories];

			if (allCategories.length === 0) {
				// Если в БД нет категорий, возвращаем дефолтные
				return {
					success: true,
					data: defaultCategories,
				};
			}

			const uniqueCategories = allCategories.filter(
				(category, index, self) =>
					index === self.findIndex(c => c.code === category.code)
			);

			// Сортируем по названию
			uniqueCategories.sort((a, b) => a.name.localeCompare(b.name));

			// Добавляем id для каждой категории
			const categoriesWithId = uniqueCategories.map((category, index) => ({
				id: index + 1,
				code: category.code,
				name: category.name,
				description: `Категория ${category.name}`,
			}));

			return {
				success: true,
				data: categoriesWithId,
			};
		} catch (dbError) {
			console.error('Ошибка БД, используем дефолтные категории:', dbError);
			// Если ошибка БД, возвращаем дефолтные категории
			return {
				success: true,
				data: defaultCategories,
			};
		}
	} catch (error) {
		console.error('Ошибка при получении категорий:', error);

		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при получении категорий',
		});
	}
});
