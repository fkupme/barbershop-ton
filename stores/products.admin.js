import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useProductsAdminStore = defineStore('products-admin', () => {
	// Состояние загрузки и ошибок
	const loading = ref(false)
	const error = ref(null)

	// Данные товаров
	const products = ref([])

	// Геттеры
	const activeProducts = computed(() =>
		products.value
			.filter(product => product.is_active)
			.sort((a, b) => a.sort_order - b.sort_order)
	)

	const groupedProducts = computed(() => {
		const groups = {}

		products.value.forEach(product => {
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

	const totalProducts = computed(() => products.value.length)

	// CRUD методы
	const fetchProducts = async () => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch('/api/admin/products')
			if (response.success) {
				products.value = response.data
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка загрузки товаров'
			console.error('Ошибка загрузки товаров:', err)
		} finally {
			loading.value = false
		}
	}

	const createProduct = async (productData) => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch('/api/admin/products', {
				method: 'POST',
				body: productData
			})

			if (response.success) {
				products.value.push(response.data)
				return response.data
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка создания товара'
			console.error('Ошибка создания товара:', err)
			throw err
		} finally {
			loading.value = false
		}
	}

	const updateProduct = async (id, productData) => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch(`/api/admin/products/${id}`, {
				method: 'PUT',
				body: productData
			})

			if (response.success) {
				const index = products.value.findIndex(product => product.id === id)
				if (index !== -1) {
					products.value[index] = response.data
				}
				return response.data
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка обновления товара'
			console.error('Ошибка обновления товара:', err)
			throw err
		} finally {
			loading.value = false
		}
	}

	const deleteProduct = async (id) => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch(`/api/admin/products/${id}`, {
				method: 'DELETE'
			})

			if (response.success) {
				products.value = products.value.filter(product => product.id !== id)
				return true
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка удаления товара'
			console.error('Ошибка удаления товара:', err)
			throw err
		} finally {
			loading.value = false
		}
	}

	const toggleProductStatus = async (id) => {
		const product = products.value.find(p => p.id === id)
		if (!product) return

		return await updateProduct(id, {
			...product,
			is_active: !product.is_active
		})
	}

	const clearError = () => {
		error.value = null
	}

	const getProductById = (id) => {
		return products.value.find(product => product.id === id)
	}

	return {
		// Состояние
		loading: readonly(loading),
		error: readonly(error),
		products: readonly(products),

		// Геттеры
		activeProducts,
		groupedProducts,
		totalProducts,

		// Действия
		fetchProducts,
		createProduct,
		updateProduct,
		deleteProduct,
		toggleProductStatus,
		clearError,
		getProductById
	}
}) 