import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useHeroAdminStore = defineStore('hero-admin', () => {
	// Состояние загрузки и ошибок
	const loading = ref(false)
	const error = ref(null)

	// Данные изображений героя
	const images = ref([])

	// Геттеры
	const activeImages = computed(() =>
		images.value
			.filter(img => img.is_active)
			.sort((a, b) => a.sort_order - b.sort_order)
	)

	const totalImages = computed(() => images.value.length)

	// CRUD методы
	const fetchImages = async () => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch('/api/admin/hero-images')
			if (response.success) {
				images.value = response.data
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка загрузки изображений'
			console.error('Ошибка загрузки изображений героя:', err)
		} finally {
			loading.value = false
		}
	}

	const createImage = async (imageData) => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch('/api/admin/hero-images', {
				method: 'POST',
				body: imageData
			})

			if (response.success) {
				images.value.push(response.data)
				return response.data
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка создания изображения'
			console.error('Ошибка создания изображения:', err)
			throw err
		} finally {
			loading.value = false
		}
	}

	const updateImage = async (id, imageData) => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch(`/api/admin/hero-images/${id}`, {
				method: 'PUT',
				body: imageData
			})

			if (response.success) {
				const index = images.value.findIndex(img => img.id === id)
				if (index !== -1) {
					images.value[index] = response.data
				}
				return response.data
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка обновления изображения'
			console.error('Ошибка обновления изображения:', err)
			throw err
		} finally {
			loading.value = false
		}
	}

	const deleteImage = async (id) => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch(`/api/admin/hero-images/${id}`, {
				method: 'DELETE'
			})

			if (response.success) {
				images.value = images.value.filter(img => img.id !== id)
				return true
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка удаления изображения'
			console.error('Ошибка удаления изображения:', err)
			throw err
		} finally {
			loading.value = false
		}
	}

	const toggleImageStatus = async (id) => {
		const image = images.value.find(img => img.id === id)
		if (!image) return

		return await updateImage(id, {
			...image,
			is_active: !image.is_active
		})
	}

	const reorderImages = async (newOrder) => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch('/api/admin/hero-images/reorder', {
				method: 'PUT',
				body: { order: newOrder }
			})

			if (response.success) {
				await fetchImages() // Обновляем данные
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка изменения порядка'
			console.error('Ошибка изменения порядка:', err)
			throw err
		} finally {
			loading.value = false
		}
	}

	const clearError = () => {
		error.value = null
	}

	const getImageById = (id) => {
		return images.value.find(img => img.id === id)
	}

	return {
		// Состояние
		loading: readonly(loading),
		error: readonly(error),
		images: readonly(images),

		// Геттеры
		activeImages,
		totalImages,

		// Действия
		fetchImages,
		createImage,
		updateImage,
		deleteImage,
		toggleImageStatus,
		reorderImages,
		clearError,
		getImageById
	}
}) 