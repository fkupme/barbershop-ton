<template>
	<q-layout class="layout-blur" :class="{ 'layout-blur_active': isActive }" view="hHh LpR fFf">
		<q-header class="header bg-white text-black" bordered>
			<q-toolbar class="q-mx-auto q-px-md" style="max-width: 1200px">
				<q-toolbar-title>
					<div class="logo">
						<img src="~/assets/TON.svg" alt="TON Logo" class="logo-img" />
					</div>
				</q-toolbar-title>

				<nav class="desktop-nav q-mr-md">
					<q-btn flat no-caps href="#">
						ЦЕНЫ И УСЛУГИ
						<span class="border border-top"></span>
						<span class="border border-right"></span>
						<span class="border border-bottom"></span>
						<span class="border border-left"></span>
					</q-btn>
					<q-btn flat no-caps href="#">
						МАГАЗИН
						<span class="border border-top"></span>
						<span class="border border-right"></span>
						<span class="border border-bottom"></span>
						<span class="border border-left"></span>
					</q-btn>
					<q-btn flat no-caps href="#">
						ПОДАРОЧНЫЕ СЕРТИФИКАТЫ
						<span class="border border-top"></span>
						<span class="border border-right"></span>
						<span class="border border-bottom"></span>
						<span class="border border-left"></span>
					</q-btn>
					<q-btn flat no-caps href="#">
						КОНТАКТЫ
						<span class="border border-top"></span>
						<span class="border border-right"></span>
						<span class="border border-bottom"></span>
						<span class="border border-left"></span>
					</q-btn>
				</nav>

				<UIMainButton
					label="ОНЛАЙН-ЗАПИСЬ"
					custom-class="online-btn"
					@click="bookingStore.openBooking()"
				/>

				<q-btn
					dense
					flat
					icon="menu"
					class="mobile-menu q-ml-md"
					@click="drawer = !drawer"
				/>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="drawer" side="left" bordered overlay class="mobile-nav">
			<q-list>
				<q-item clickable v-close-popup class="q-pa-md">
					<q-item-section>ЦЕНЫ И УСЛУГИ</q-item-section>
				</q-item>
				<q-item clickable v-close-popup class="q-pa-md">
					<q-item-section>МАГАЗИН</q-item-section>
				</q-item>
				<q-item clickable v-close-popup class="q-pa-md">
					<q-item-section>ПОДАРОЧНЫЕ СЕРТИФИКАТЫ</q-item-section>
				</q-item>
				<q-item clickable v-close-popup class="q-pa-md">
					<q-item-section>КОНТАКТЫ</q-item-section>
				</q-item>
				<q-item clickable v-close-popup class="q-pa-md">
					<q-item-section>
						<UIMainButton
							label="ОНЛАЙН-ЗАПИСЬ"
							custom-class="full-width online-btn"
							@click="bookingStore.openBooking()"
						/>
					</q-item-section>
				</q-item>

				<!-- Разделитель -->
				<q-separator class="q-my-md" />

				<!-- Адреса из футера -->
				<q-item class="q-pa-md addresses-item">
					<q-item-section>
						<div class="drawer-addresses">
							<div class="address-item">• Люберцы, 8 марта, 12к2 •</div>
						</div>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>

		<q-page-container>
			<slot />
		</q-page-container>

		<!-- Компонент для записи -->
		<UIBookingDrawer />

		<q-footer class="bg-white text-black" bordered>
			<q-toolbar>
				<q-toolbar-title>
					<div class="footer-info">
						<div>@ton.moscow</div>
						<div class="addresses">
							<span class="q-mr-md">• Люберцы, 8 марта, 12к2 •</span>
						</div>
						<div>© 2025 TON Moscow</div>
					</div>
				</q-toolbar-title>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking";
import { ref } from "vue";

const drawer = ref(false);
const bookingStore = useBookingStore();
const isActive = computed(() => bookingStore.isBookingOpen);
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables" as *;
@use "~/assets/styles/mixins" as *;
.layout-blur {
		&::before {
			opacity: 0;
			content: "";
			position: absolute;
			inset: 0 0 0 0;
			background: rgba(0, 0, 0, 0.4);
			backdrop-filter: blur(8px);
			z-index: 0;
			transition: opacity 0.3s ease;
		}
		&_active {
			&::before {
				z-index: 2000;
				opacity: 1;
				transition: opacity 0.3s ease;
			}
		}
	}
.header {
	
	.q-toolbar {
		// max-width: $container-width; - удалено
		// margin: 0 auto; - удалено
		// padding: $spacing-md; - удалено
	}

	.logo {
		// font-family: "RF Dewi Extended", sans-serif; // Убираем стили для текста
		// font-weight: 700;
		// font-size: 1.5rem;

		.logo-img {
			height: 40px; // Задаем высоту логотипа
			width: auto; // Ширина будет пропорциональна
			vertical-align: middle;
		}
	}

	.desktop-nav {
		display: none;

		@media (min-width: 740px) {
			display: flex;
			// margin-right: $spacing-md; - удалено
		}
		@include animated-menu-item-borders;

		// Убираем дефолтные ховеры у кнопок Quasar
		.q-btn {
			&:before {
				display: none; // Убираем ripple-эффект при наведении
			}

			&:hover {
				background: transparent !important; // Убираем фоновую подсветку при наведении
			}

			.q-focus-helper {
				display: none !important; // Убираем фокусный хелпер
			}

			// Убираем переходы для фона при наведении
			transition: none !important;
			&:after {
				transition: none !important;
			}
		}
	}

	.online-btn {
		@media (max-width: 740px) {
			display: none;
		}
	}

	.mobile-menu {
		@media (min-width: 740px) {
			display: none;
		}
	}
}

.mobile-nav {
	.q-item {
		font-family: "RF Dewi Condensed", sans-serif;
		font-weight: 600;
		// padding: $spacing-md; - удалено
	}

	.drawer-addresses {
		.address-item {
			margin-bottom: 8px;
			font-size: 14px;
			color: var(--color-dark);
		}
	}
}

.footer-info {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (min-width: 740px) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.addresses {
		display: none;

		@media (min-width: 740px) {
			display: flex;
		}
	}
}

// Стили для блюра только для правого дровера (booking)
.q-layout .booking-drawer.q-drawer--overlay .q-drawer__backdrop,
.booking-drawer.q-drawer--overlay .q-drawer__backdrop {
	backdrop-filter: blur(8px) !important;
	background: rgba(0, 0, 0, 0.4) !important;
	transition: all 0.3s ease !important;
}

// Блюр контента при открытии правого дровера - более специфичный селектор
.q-layout.q-layout--drawer-right-open .q-page-container,
.q-layout.q-layout--drawer-right-open .q-header,
.q-layout.q-layout--drawer-right-open .q-footer {
	filter: blur(2px) !important;
	transition: filter 0.3s ease !important;
}

// Стили для bottom sheet диалогов (мобильная версия)
.booking-bottom-sheet.q-dialog .q-dialog__backdrop,
.booking-bottom-sheet .q-dialog__backdrop {
	backdrop-filter: blur(8px) !important;
	background: rgba(0, 0, 0, 0.4) !important;
	transition: all 0.3s ease !important;
}

// Убираем блюр для левого дровера (навигация) - более специфичный селектор
.q-layout .mobile-nav.q-drawer--overlay .q-drawer__backdrop,
.mobile-nav.q-drawer--overlay .q-drawer__backdrop {
	backdrop-filter: none !important;
	background: rgba(0, 0, 0, 0.5) !important;
}
</style> 