import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useServicesAdminStore = defineStore('services-admin', () => {
	// Состояние загрузки и ошибок
	const loading = ref(false)
	const error = ref(null)

	// Данные услуг
	const services = ref([])

	// Геттеры
	const activeServices = computed(() =>
		services.value
			.filter(service => service.is_active)
			.sort((a, b) => a.sort_order - b.sort_order)
	)

	const groupedServices = computed(() => {
		const groups = {}

		services.value.forEach(service => {
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

	const totalServices = computed(() => services.value.length)

	// CRUD методы
	const fetchServices = async () => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch('/api/admin/services')
			if (response.success) {
				services.value = response.data
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка загрузки услуг'
			console.error('Ошибка загрузки услуг:', err)
		} finally {
			loading.value = false
		}
	}

	const createService = async (serviceData) => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch('/api/admin/services', {
				method: 'POST',
				body: serviceData
			})

			if (response.success) {
				services.value.push(response.data)
				return response.data
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка создания услуги'
			console.error('Ошибка создания услуги:', err)
			throw err
		} finally {
			loading.value = false
		}
	}

	const updateService = async (id, serviceData) => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch(`/api/admin/services/${id}`, {
				method: 'PUT',
				body: serviceData
			})

			if (response.success) {
				const index = services.value.findIndex(service => service.id === id)
				if (index !== -1) {
					services.value[index] = response.data
				}
				return response.data
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка обновления услуги'
			console.error('Ошибка обновления услуги:', err)
			throw err
		} finally {
			loading.value = false
		}
	}

	const deleteService = async (id) => {
		loading.value = true
		error.value = null

		try {
			const response = await $fetch(`/api/admin/services/${id}`, {
				method: 'DELETE'
			})

			if (response.success) {
				services.value = services.value.filter(service => service.id !== id)
				return true
			}
		} catch (err) {
			error.value = err.data?.statusMessage || 'Ошибка удаления услуги'
			console.error('Ошибка удаления услуги:', err)
			throw err
		} finally {
			loading.value = false
		}
	}

	const toggleServiceStatus = async (id) => {
		const service = services.value.find(s => s.id === id)
		if (!service) return

		return await updateService(id, {
			...service,
			is_active: !service.is_active
		})
	}

	const clearError = () => {
		error.value = null
	}

	const getServiceById = (id) => {
		return services.value.find(service => service.id === id)
	}

	return {
		// Состояние
		loading: readonly(loading),
		error: readonly(error),
		services: readonly(services),

		// Геттеры
		activeServices,
		groupedServices,
		totalServices,

		// Действия
		fetchServices,
		createService,
		updateService,
		deleteService,
		toggleServiceStatus,
		clearError,
		getServiceById
	}
}) 