import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'

export const useServicesStore = defineStore('services', () => {
	// Состояние загрузки
	const loading = ref(false)

	// Данные услуг
	const services = ref([])

	// Фильтры
	const searchQuery = ref('')
	const selectedCategory = ref('all')

	// Выбранные услуги
	const selectedServices = ref([])

	// Геттеры
	const activeServices = computed(() =>
		services.value
			.filter(service => service.is_active)
			.sort((a, b) => a.sort_order - b.sort_order)
	)

	const filteredServices = computed(() => {
		let filtered = activeServices.value

		// Фильтр по поиску
		if (searchQuery.value) {
			const query = searchQuery.value.toLowerCase()
			filtered = filtered.filter(service =>
				service.title.toLowerCase().includes(query) ||
				service.description.toLowerCase().includes(query)
			)
		}

		// Фильтр по категории
		if (selectedCategory.value !== 'all') {
			filtered = filtered.filter(service => service.category === selectedCategory.value)
		}

		return filtered
	})

	// Алиас для совместимости с поиском
	const searchServices = computed(() => filteredServices.value)

	const groupedServices = computed(() => {
		const groups = {}

		filteredServices.value.forEach(service => {
			if (!groups[service.category]) {
				groups[service.category] = {
					name: service.category_name,
					services: []
				}
			}
			groups[service.category].services.push(service)
		})

		// Сортируем услуги в каждой группе
		Object.values(groups).forEach(group => {
			group.services.sort((a, b) => a.sort_order - b.sort_order)
		})

		return groups
	})

	const totalServices = computed(() => activeServices.value.length)

	const categories = computed(() => {
		const cats = [...new Set(activeServices.value.map(s => s.category))]
		return cats.map(cat => {
			const service = activeServices.value.find(s => s.category === cat)
			return {
				value: cat,
				label: service.category_name
			}
		})
	})

	// Загрузка данных для клиентской части
	const fetchServices = async () => {
		loading.value = true

		try {
			const response = await $fetch('/api/services')
			if (response.success) {
				// Парсим JSON теги если они есть
				services.value = response.data.map(service => ({
					...service,
					tags: service.tags ? JSON.parse(service.tags) : []
				}))
			}
		} catch (err) {
			console.error('Ошибка загрузки услуг:', err)
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

	// Методы для работы с выбранными услугами
	const isSelected = (serviceId) => {
		return selectedServices.value.includes(serviceId)
	}

	const selectService = (serviceId) => {
		if (!selectedServices.value.includes(serviceId)) {
			selectedServices.value.push(serviceId)
		}
	}

	const unselectService = (serviceId) => {
		const index = selectedServices.value.indexOf(serviceId)
		if (index > -1) {
			selectedServices.value.splice(index, 1)
		}
	}

	const clearSelection = () => {
		selectedServices.value = []
	}

	return {
		// Состояние
		loading: readonly(loading),
		services: readonly(services),
		searchQuery: readonly(searchQuery),
		selectedCategory: readonly(selectedCategory),
		selectedServices: readonly(selectedServices),

		// Геттеры
		activeServices,
		filteredServices,
		searchServices, // Алиас для совместимости
		groupedServices,
		totalServices,
		categories,

		// Действия
		fetchServices,
		setSearchQuery,
		setSelectedCategory,
		clearFilters,

		// Методы выбора
		isSelected,
		selectService,
		unselectService,
		clearSelection
	}
}) 