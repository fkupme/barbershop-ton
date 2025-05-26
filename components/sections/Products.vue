<template>
	<section class="products-section q-py-lg">
		<!-- SEO-заголовок -->
		<div class="products-header q-mb-xl">
			<h2 class="products-title q-mb-md">АРСЕНАЛ СТИЛЯ</h2>
			<p class="products-subtitle">
				ПРОФЕССИОНАЛЬНЫЕ СРЕДСТВА, КОТОРЫЕ ВЫ МОЖЕТЕ ПРИОБРЕСТИ В НАШЕЙ
				БАРБЕРШОПЕ
			</p>
		</div>

		<!-- Контейнер для свайпера -->
		<div class="products-content q-px-md">
			<ClientOnly>
				<swiper-container
					ref="swiperRef"
					:slides-per-view="slidesPerView"
					:space-between="spaceBetween"
					:loop="true"
					:autoplay-delay="4000"
					:autoplay-disable-on-interaction="false"
					navigation="true"
					class="products-swiper"
				>
					<swiper-slide
						v-for="product in productsStore.popularProducts"
						:key="product.id"
						class="products-slide"
					>
						<ProductCard
							:id="product.id"
							:title="product.title"
							:description="product.description"
							:image="product.image"
						/>
					</swiper-slide>
				</swiper-container>
			</ClientOnly>
		</div>
	</section>
</template>

<script setup>
import { useWindowSize } from "@vueuse/core";

// Импортируем компонент карточки товара
const ProductCard = defineAsyncComponent(() =>
	import("~/components/product/Card.vue")
);

const { width } = useWindowSize();

// Используем стор с товарами
const productsStore = useProductsStore();

// Адаптивные настройки свайпера
const slidesPerView = computed(() => {
	if (width.value < 576) {
		return 1;
	} else if (width.value < 768) {
		return 2;
	} else if (width.value < 1024) {
		return 3;
	} else {
		return 4;
	}
});

const spaceBetween = computed(() => {
	if (width.value < 576) {
		return 16;
	} else if (width.value < 768) {
		return 20;
	} else {
		return 24;
	}
});
</script>

<style lang="scss">
.products-section {
	overflow: hidden;
}

.products-header {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1rem;
	text-align: center;
}

.products-title {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 2.5rem;
	text-transform: uppercase;
	line-height: 1.2;
	color: var(--color-black, #000);
	margin: 0;
	margin-bottom: 1rem;

	@media (min-width: 768px) {
		font-size: 3rem;
	}

	@media (max-width: 479px) {
		font-size: 2rem;
	}
}

.products-subtitle {
	font-family: "RF Dewi Condensed", sans-serif;
	font-size: 1.2rem;
	line-height: 1.3;
	color: var(--color-dark, #333);
	margin: 0;
	text-transform: lowercase;

	@media (min-width: 768px) {
		font-size: 1.4rem;
	}

	@media (max-width: 479px) {
		font-size: 1.1rem;
	}
}

.products-content {
	max-width: 1200px;
	margin: 0 auto;
	width: 100%;
}

.products-swiper {
	width: 100%;

	// Стили для навигации
	--swiper-navigation-color: var(--color-black, #000);
	--swiper-navigation-size: 24px;

	.swiper-button-next,
	.swiper-button-prev {
		background: var(--color-white, #fff);
		border-radius: 50%;
		width: 44px;
		height: 44px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
		transition: all 0.3s ease;

		&:hover {
			transform: scale(1.1);
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		}

		&::after {
			font-size: 16px;
			font-weight: 700;
		}
	}
}

.products-slide {
	height: auto;
	margin-inline: auto;
}

// CSS переменные если их нет
:root {
	--color-white: #ffffff;
	--color-black: #000000;
	--color-dark: #333333;
	--color-gray: #cccccc;
	--color-light-gray: #f8f9fa;
}
</style> 