export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	components: [
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
});
