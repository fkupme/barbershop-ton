import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useHeroStore = defineStore('hero', () => {
	// Данные изображений героя
	const images = ref([])

	// Состояние загрузки
	const loading = ref(false)

	// Геттеры
	const activeImages = computed(() =>
		images.value
			.filter(img => img.is_active)
			.sort((a, b) => a.sort_order - b.sort_order)
	)

	const totalImages = computed(() => images.value.length)

	// Загрузка данных для клиентской части
	const fetchImages = async () => {
		loading.value = true

		try {
			const response = await $fetch('/api/hero-images')
			if (response.success) {
				images.value = response.data
			}
		} catch (err) {
			console.error('Ошибка загрузки изображений героя:', err)
		} finally {
			loading.value = false
		}
	}

	return {
		// Состояние
		loading: readonly(loading),
		images: readonly(images),

		// Геттеры
		activeImages,
		totalImages,

		// Действия
		fetchImages
	}
}) 