import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
	// Состояние загрузки
	const loading = ref(false)

	// Данные товаров
	const products = ref([])

	// Фильтры
	const searchQuery = ref('')
	const selectedCategory = ref('all')

	// Геттеры
	const activeProducts = computed(() =>
		products.value
			.filter(product => product.is_active)
			.sort((a, b) => a.sort_order - b.sort_order)
	)

	const filteredProducts = computed(() => {
		let filtered = activeProducts.value

		// Фильтр по поиску
		if (searchQuery.value) {
			const query = searchQuery.value.toLowerCase()
			filtered = filtered.filter(product =>
				product.title.toLowerCase().includes(query) ||
				product.description.toLowerCase().includes(query) ||
				product.tags?.some(tag => tag.toLowerCase().includes(query))
			)
		}

		// Фильтр по категории
		if (selectedCategory.value !== 'all') {
			filtered = filtered.filter(product => product.category === selectedCategory.value)
		}

		return filtered
	})

	const groupedProducts = computed(() => {
		const groups = {}

		filteredProducts.value.forEach(product => {
			if (!groups[product.category]) {
				groups[product.category] = {
					name: product.category_name,
					products: []
				}
			}
			groups[product.category].products.push(product)
		})

		// Сортируем товары в каждой группе
		Object.values(groups).forEach(group => {
			group.products.sort((a, b) => a.sort_order - b.sort_order)
		})

		return groups
	})

	const totalProducts = computed(() => activeProducts.value.length)

	const categories = computed(() => {
		const cats = [...new Set(activeProducts.value.map(p => p.category))]
		return cats.map(cat => {
			const product = activeProducts.value.find(p => p.category === cat)
			return {
				value: cat,
				label: product.category_name
			}
		})
	})

	// Загрузка данных для клиентской части
	const fetchProducts = async () => {
		loading.value = true

		try {
			const response = await $fetch('/api/products')
			if (response.success) {
				// Парсим JSON теги - они уже распарсены в API, но на всякий случай
				products.value = response.data.map(product => ({
					...product,
					tags: Array.isArray(product.tags) ? product.tags : (product.tags ? JSON.parse(product.tags) : [])
				}))
			}
		} catch (err) {
			console.error('Ошибка загрузки товаров:', err)
		} finally {
			loading.value = false
		}
	}

	// Фильтры
	const setSearchQuery = (query) => {
		searchQuery.value = query
	}

	const setSelectedCategory = (category) => {
		selectedCategory.value = category
	}

	const clearFilters = () => {
		searchQuery.value = ''
		selectedCategory.value = 'all'
	}

	return {
		// Состояние
		loading: readonly(loading),
		products: readonly(products),
		searchQuery: readonly(searchQuery),
		selectedCategory: readonly(selectedCategory),

		// Геттеры
		activeProducts,
		filteredProducts,
		groupedProducts,
		totalProducts,
		categories,

		// Действия
		fetchProducts,
		setSearchQuery,
		setSelectedCategory,
		clearFilters
	}
}) 