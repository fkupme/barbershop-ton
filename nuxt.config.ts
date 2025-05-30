export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	components: [
		{
			path: '~/components/admin',
			pathPrefix: false,
			prefix: 'Admin',
		},
		{
			path: '~/components/UI',
			pathPrefix: false,
			prefix: 'UI',
		},
		{
			path: '~/components/sections',
			pathPrefix: false,
			prefix: 'Section',
		},
		{
			path: '~/components/service',
			pathPrefix: false,
			prefix: 'Services',
		},
		{
			path: '~/components/product',
			pathPrefix: false,
			prefix: 'Product',
		},
	],

	modules: [
		'@nuxt/content',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'nuxt-quasar-ui',
		'@pinia/nuxt',
		'nuxt-swiper',
	],

	// Добавляем поддержку SCSS
	css: ['~/assets/styles/main.scss', '~/assets/styles/fonts.scss'],

	// Настройка шрифтов через Nuxt Fonts
	fonts: {
		families: [
			{
				name: 'RF Dewi Extended',
				provider: 'local',
				src: '/fonts/RFDewiExtended-Bold.woff2',
				weights: [700],
				preload: true,
			},
			{
				name: 'RF Dewi Condensed',
				provider: 'local',
				src: '/fonts/RFDewiCondensed-Regular.woff2',
				weights: [400],
				preload: true,
			},
			{
				name: 'RF Dewi Condensed',
				provider: 'local',
				src: '/fonts/RFDewiCondensed-Thin.woff2',
				weights: [300],
				preload: true,
			},
		],
	},

	// Настройка Quasar UI
	quasar: {
		plugins: ['Notify', 'Dialog'],
		extras: {
			fontIcons: ['material-icons'],
		},
		sassVariables: 'assets/styles/quasar-variables.scss',
	},

	// Настройки Vite для CSS
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					// Временно отключаем для отладки
					// additionalData: '@use "@/assets/styles/variables" as *;',
				},
			},
		},
	},

	ssr: false,

	// Настройки приложения
	app: {
		head: {
			title: 'МУЖСКИЕ ПАРИКМАХЕРСКИЕ TON',
			meta: [
				{
					name: 'description',
					content:
						'Мужская парикмахерская TON — место силы для настоящих мужчин',
				},
			],
			link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
		},
	},
	runtimeConfig: {
		public: {
			publicKey: process.env.PUBLIC_KEY,
			secretKey: process.env.SECRET_KEY,
			apiUrl: process.env.API_URL,
			yClientsUrl: process.env.YCLIENTS_URL,
		},
		private: {
			jwtSecret: process.env.JWT_SECRET,
		},
	},
});
