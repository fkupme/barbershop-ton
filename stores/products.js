import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
	// Данные товаров для парикмахерской
	const products = ref([
		// Средства для укладки
		{
			id: 1,
			title: 'Помада для волос STRONG HOLD',
			description: 'Профессиональная помада для сильной фиксации и матового финиша',
			image: 'mdi:hair-dryer',
			category: 'styling',
			categoryName: 'Средства для укладки',
			tags: ['помада', 'фиксация', 'матовый', 'укладка']
		},
		{
			id: 2,
			title: 'Воск для волос CLASSIC',
			description: 'Классический воск для естественной укладки с легким блеском',
			image: 'mdi:spray-bottle',
			category: 'styling',
			categoryName: 'Средства для укладки',
			tags: ['воск', 'классический', 'блеск', 'укладка']
		},
		{
			id: 3,
			title: 'Гель для волос ULTRA STRONG',
			description: 'Гель экстра-сильной фиксации для создания четких контуров',
			image: 'mdi:bottle-tonic',
			category: 'styling',
			categoryName: 'Средства для укладки',
			tags: ['гель', 'сильная фиксация', 'контуры']
		},
		{
			id: 4,
			title: 'Спрей для объема VOLUME BOOST',
			description: 'Спрей для придания объема тонким волосам',
			image: 'mdi:spray',
			category: 'styling',
			categoryName: 'Средства для укладки',
			tags: ['спрей', 'объем', 'тонкие волосы']
		},

		// Уход за бородой
		{
			id: 5,
			title: 'Масло для бороды BEARD KING',
			description: 'Питательное масло для смягчения и ухода за бородой',
			image: 'mdi:bottle-tonic-outline',
			category: 'beard',
			categoryName: 'Уход за бородой',
			tags: ['масло', 'борода', 'питание', 'смягчение']
		},
		{
			id: 6,
			title: 'Бальзам для бороды GENTLEMAN',
			description: 'Бальзам для укладки и фиксации бороды',
			image: 'mdi:bottle-tonic-plus',
			category: 'beard',
			categoryName: 'Уход за бородой',
			tags: ['бальзам', 'борода', 'укладка', 'фиксация']
		},
		{
			id: 7,
			title: 'Шампунь для бороды DEEP CLEAN',
			description: 'Специальный шампунь для глубокого очищения бороды',
			image: 'mdi:bottle-tonic-skull',
			category: 'beard',
			categoryName: 'Уход за бородой',
			tags: ['шампунь', 'борода', 'очищение']
		},

		// Уход за кожей
		{
			id: 8,
			title: 'Крем после бритья SOOTHING',
			description: 'Успокаивающий крем для восстановления кожи после бритья',
			image: 'mdi:face-man',
			category: 'skincare',
			categoryName: 'Уход за кожей',
			tags: ['крем', 'после бритья', 'успокаивающий']
		},
		{
			id: 9,
			title: 'Скраб для лица MEN POWER',
			description: 'Отшелушивающий скраб для глубокого очищения пор',
			image: 'mdi:face-man-outline',
			category: 'skincare',
			categoryName: 'Уход за кожей',
			tags: ['скраб', 'лицо', 'очищение', 'поры']
		},
		{
			id: 10,
			title: 'Увлажняющий крем HYDRA MAN',
			description: 'Интенсивно увлажняющий крем для мужской кожи',
			image: 'mdi:face-man-shimmer',
			category: 'skincare',
			categoryName: 'Уход за кожей',
			tags: ['увлажнение', 'крем', 'мужская кожа']
		},

		// Инструменты
		{
			id: 11,
			title: 'Расческа CARBON FIBER',
			description: 'Профессиональная расческа из карбонового волокна',
			image: 'mdi:comb',
			category: 'tools',
			categoryName: 'Инструменты',
			tags: ['расческа', 'карбон', 'профессиональная']
		},
		{
			id: 12,
			title: 'Щетка для бороды BOAR BRISTLE',
			description: 'Щетка из натуральной щетины кабана для ухода за бородой',
			image: 'mdi:brush',
			category: 'tools',
			categoryName: 'Инструменты',
			tags: ['щетка', 'борода', 'натуральная щетина']
		},
		{
			id: 13,
			title: 'Ножницы для стрижки PRO CUT',
			description: 'Профессиональные ножницы из японской стали',
			image: 'mdi:content-cut',
			category: 'tools',
			categoryName: 'Инструменты',
			tags: ['ножницы', 'профессиональные', 'японская сталь']
		},

		// Подарочные наборы
		{
			id: 14,
			title: 'Набор GENTLEMAN STARTER',
			description: 'Стартовый набор для ухода: помада, масло для бороды, расческа',
			image: 'mdi:gift',
			category: 'sets',
			categoryName: 'Подарочные наборы',
			tags: ['набор', 'подарок', 'стартовый', 'уход']
		},
		{
			id: 15,
			title: 'Набор PREMIUM CARE',
			description: 'Премиум набор: все необходимое для полного ухода',
			image: 'mdi:gift-outline',
			category: 'sets',
			categoryName: 'Подарочные наборы',
			tags: ['набор', 'премиум', 'полный уход']
		},
		{
			id: 16,
			title: 'Набор BEARD MASTER',
			description: 'Специальный набор для ухода за бородой',
			image: 'mdi:gift-open',
			category: 'sets',
			categoryName: 'Подарочные наборы',
			tags: ['набор', 'борода', 'специальный']
		}
	])

	// Поисковый запрос
	const searchQuery = ref('')

	// Выбранная категория
	const selectedCategory = ref('')

	// Фильтрованные товары по поиску
	const searchProducts = computed(() => {
		if (!searchQuery.value.trim()) {
			return products.value
		}

		const query = searchQuery.value.toLowerCase().trim()
		return products.value.filter(product => {
			return (
				product.title.toLowerCase().includes(query) ||
				product.description.toLowerCase().includes(query) ||
				product.tags.some(tag => tag.toLowerCase().includes(query)) ||
				product.categoryName.toLowerCase().includes(query)
			)
		})
	})

	// Группировка товаров по категориям
	const groupedProducts = computed(() => {
		const groups = {}

		products.value.forEach(product => {
			if (!groups[product.category]) {
				groups[product.category] = {
					name: product.categoryName,
					products: []
				}
			}
			groups[product.category].products.push(product)
		})

		return groups
	})

	// Получение товаров по категории
	const getProductsByCategory = computed(() => {
		return (category) => {
			if (!category) return products.value
			return products.value.filter(product => product.category === category)
		}
	})

	// Все категории
	const categories = computed(() => {
		const cats = new Set()
		products.value.forEach(product => {
			cats.add(product.category)
		})
		return Array.from(cats).map(cat => {
			const product = products.value.find(p => p.category === cat)
			return {
				key: cat,
				name: product.categoryName
			}
		})
	})

	// Популярные товары (первые 8)
	const popularProducts = computed(() => {
		return products.value.slice(0, 8)
	})

	// Методы
	const setSearchQuery = (query) => {
		searchQuery.value = query
	}

	const setSelectedCategory = (category) => {
		selectedCategory.value = category
	}

	const clearFilters = () => {
		searchQuery.value = ''
		selectedCategory.value = ''
	}

	const getProductById = (id) => {
		return products.value.find(product => product.id === id)
	}

	return {
		// Состояние
		products: readonly(products),
		searchQuery: readonly(searchQuery),
		selectedCategory: readonly(selectedCategory),

		// Вычисляемые свойства
		searchProducts,
		groupedProducts,
		getProductsByCategory,
		categories,
		popularProducts,

		// Методы
		setSearchQuery,
		setSelectedCategory,
		clearFilters,
		getProductById
	}
}) 