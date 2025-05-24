import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'

export const useServicesStore = defineStore('services', () => {
	// Реальные данные услуг из прайс-листа
	const services = ref([
		// Стрижки
		{
			id: 1,
			title: 'Мужская стрижка',
			description: 'Профессиональная стрижка любой сложности',
			price: 1500,
			category: 'haircuts',
			categoryName: 'Стрижки',
			tags: ['мужская', 'стрижка', 'волосы']
		},
		{
			id: 2,
			title: 'Детская стрижка',
			description: 'Стрижка для детей в комфортной обстановке',
			price: 1200,
			category: 'haircuts',
			categoryName: 'Стрижки',
			tags: ['детская', 'стрижка', 'дети']
		},
		{
			id: 3,
			title: 'Стрижка машинкой (2 насадки - Fade)',
			description: 'Стрижка с плавными переходами',
			price: 1000,
			category: 'haircuts',
			categoryName: 'Стрижки',
			tags: ['машинка', 'fade', 'градиент']
		},
		{
			id: 4,
			title: 'Стрижка машинкой (1 насадка)',
			description: 'Простая стрижка одной насадкой',
			price: 700,
			category: 'haircuts',
			categoryName: 'Стрижки',
			tags: ['машинка', 'простая']
		},
		{
			id: 5,
			title: 'Классическая стрижка ножницами',
			description: 'Удлиненная стрижка ножницами',
			price: 1700,
			category: 'haircuts',
			categoryName: 'Стрижки',
			tags: ['ножницы', 'классическая', 'удлиненная']
		},
		{
			id: 6,
			title: 'Бритьё головы опасным лезвием',
			description: 'Традиционное бритьё опасной бритвой',
			price: 1500,
			category: 'haircuts',
			categoryName: 'Стрижки',
			tags: ['бритьё', 'голова', 'опасная бритва']
		},

		// Стрижка бороды и усов
		{
			id: 7,
			title: 'Коррекция бороды и усов',
			description: 'Придание формы и коррекция',
			price: 1100,
			category: 'beard',
			categoryName: 'Стрижка бороды и усов',
			tags: ['борода', 'усы', 'коррекция']
		},
		{
			id: 8,
			title: 'Моделирование бороды',
			description: 'Создание желаемой формы бороды',
			price: 1300,
			category: 'beard',
			categoryName: 'Стрижка бороды и усов',
			tags: ['борода', 'моделирование', 'форма']
		},
		{
			id: 9,
			title: 'Королевское бритьё',
			description: 'Премиальная процедура бритья',
			price: 1200,
			category: 'beard',
			categoryName: 'Стрижка бороды и усов',
			tags: ['бритьё', 'премиум', 'королевское']
		},

		// Комплексные услуги
		{
			id: 10,
			title: 'Мужская стрижка + коррекция бороды и усов',
			description: 'Комплексная услуга стрижки и ухода за бородой',
			price: 2300,
			category: 'complex',
			categoryName: 'Комплексные услуги',
			tags: ['комплекс', 'стрижка', 'борода']
		},
		{
			id: 11,
			title: 'Мужская стрижка + моделирование бороды',
			description: 'Стрижка с моделированием бороды',
			price: 2500,
			category: 'complex',
			categoryName: 'Комплексные услуги',
			tags: ['комплекс', 'стрижка', 'моделирование']
		},
		{
			id: 12,
			title: 'Мужская стрижка + черная маска',
			description: 'Стрижка с уходовой маской',
			price: 2100,
			category: 'complex',
			categoryName: 'Комплексные услуги',
			tags: ['комплекс', 'стрижка', 'маска']
		},
		{
			id: 13,
			title: 'Отец + сын (до 8 лет)',
			description: 'Семейная стрижка для отца и ребенка',
			price: 2500,
			category: 'complex',
			categoryName: 'Комплексные услуги',
			tags: ['семейная', 'отец', 'сын', 'дети']
		},

		// Уход за лицом
		{
			id: 14,
			title: 'Воск',
			description: 'Удаление нежелательных волос воском',
			price: 500,
			category: 'skincare',
			categoryName: 'Уход за лицом',
			tags: ['воск', 'депиляция', 'уход']
		},
		{
			id: 15,
			title: 'Черная маска',
			description: 'Очищающая маска для лица',
			price: 1200,
			category: 'skincare',
			categoryName: 'Уход за лицом',
			tags: ['маска', 'очищение', 'уход']
		},
		{
			id: 16,
			title: 'Volcano',
			description: 'Профессиональная маска Volcano',
			price: 1200,
			category: 'skincare',
			categoryName: 'Уход за лицом',
			tags: ['volcano', 'маска', 'профессиональная']
		},
		{
			id: 17,
			title: 'Патчи',
			description: 'Увлажняющие патчи для кожи',
			price: 300,
			category: 'skincare',
			categoryName: 'Уход за лицом',
			tags: ['патчи', 'увлажнение', 'кожа']
		},

		// Дополнительные услуги
		{
			id: 18,
			title: 'Тонирование головы',
			description: 'Окрашивание волос на голове',
			price: 1500,
			category: 'additional',
			categoryName: 'Дополнительные услуги',
			tags: ['тонирование', 'окрашивание', 'голова']
		},
		{
			id: 19,
			title: 'Тонирование бороды',
			description: 'Окрашивание волос бороды',
			price: 1100,
			category: 'additional',
			categoryName: 'Дополнительные услуги',
			tags: ['тонирование', 'окрашивание', 'борода']
		},
		{
			id: 20,
			title: 'Окантовка',
			description: 'Создание четких контуров',
			price: 600,
			category: 'additional',
			categoryName: 'Дополнительные услуги',
			tags: ['окантовка', 'контуры', 'оформление']
		},
		{
			id: 21,
			title: 'Укладка',
			description: 'Стайлинг и укладка волос',
			price: 600,
			category: 'additional',
			categoryName: 'Дополнительные услуги',
			tags: ['укладка', 'стайлинг', 'волосы']
		},
	])

	// Состояние поиска и фильтрации
	const searchQuery = ref('')
	const selectedCategory = ref('all')
	const selectedServiceId = ref(null)

	// Действия
	const selectService = (id) => {
		selectedServiceId.value = id
	}

	const clearSelection = () => {
		selectedServiceId.value = null
	}

	const setSearchQuery = (query) => {
		searchQuery.value = query.toLowerCase()
	}

	const setSelectedCategory = (category) => {
		selectedCategory.value = category
	}

	const clearFilters = () => { searchQuery.value = '' }

	// Геттеры
	const getServiceById = computed(() => {
		return (id) => services.value.find(service => service.id === id)
	})

	const getServicesByPriceRange = computed(() => {
		return (minPrice, maxPrice) => {
			return services.value.filter(service => {
				return service.price >= minPrice && service.price <= maxPrice
			})
		}
	})

	const getServicesByCategory = computed(() => {
		return (category) => {
			if (category === 'all') return services.value
			return services.value.filter(service => service.category === category)
		}
	})

	const getCategories = computed(() => {
		const categories = [
			{ value: 'all', name: 'Все услуги' },
			{ value: 'haircuts', name: 'Стрижки' },
			{ value: 'beard', name: 'Стрижка бороды и усов' },
			{ value: 'complex', name: 'Комплексные услуги' },
			{ value: 'skincare', name: 'Уход за лицом' },
			{ value: 'additional', name: 'Дополнительные услуги' }
		]
		return categories
	})

	// Поиск только по тексту, без фильтрации по категории
	const searchServices = computed(() => {
		let filteredServices = services.value

		// Поиск по тексту
		if (searchQuery.value.trim()) {
			const query = searchQuery.value.trim()
			filteredServices = filteredServices.filter(service => {
				// Поиск по названию
				const titleMatch = service.title.toLowerCase().includes(query)
				// Поиск по описанию
				const descriptionMatch = service.description.toLowerCase().includes(query)
				// Поиск по тегам
				const tagsMatch = service.tags.some(tag => tag.toLowerCase().includes(query))
				// Поиск по цене (если введено число)
				const priceMatch = service.price.toString().includes(query)

				return titleMatch || descriptionMatch || tagsMatch || priceMatch
			})
		}

		return filteredServices
	})

	const groupedServices = computed(() => {
		const grouped = {}
		searchServices.value.forEach(service => {
			if (!grouped[service.category]) {
				grouped[service.category] = {
					name: service.categoryName,
					services: []
				}
			}
			grouped[service.category].services.push(service)
		})
		return grouped
	})

	const isSelected = computed(() => {
		return (id) => selectedServiceId.value === id
	})

	return {
		services: readonly(services),
		searchQuery: readonly(searchQuery),
		selectedCategory: readonly(selectedCategory),
		selectedServiceId: readonly(selectedServiceId),
		selectService,
		clearSelection,
		setSearchQuery,
		setSelectedCategory,
		clearFilters,
		getServiceById,
		getServicesByPriceRange,
		getServicesByCategory,
		getCategories,
		searchServices,
		groupedServices,
		isSelected,
	}
}) 