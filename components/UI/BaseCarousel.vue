<template>
	<div class="base-carousel q-my-md" :class="customClass">
		<Swiper
			:modules="modules"
			:slides-per-view="slidesPerView"
			:space-between="spaceBetween"
			:loop="loop"
			:navigation="navigation"
			@swiper="onSwiper"
			class="swiper-fix"
		>
			<slot name="before-slides"></slot>

			<SwiperSlide
				v-for="(imageSrc, index) in imageSources"
				:key="index"
				class="swiper-slide-fix"
			>
				<q-img
					:src="imageSrc"
					alt="Slide image"
					class="base-carousel__slide-img"
					fit="cover"
				/>
			</SwiperSlide>

			<slot name="after-slides"></slot>
		</Swiper>
	</div>
</template>

<script setup>
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";

// Импортируем базовые стили Swiper
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps({
	imageSources: {
		type: Array,
		default: () => [],
	},
	slidesPerView: {
		type: [Number, String],
		default: 1,
	},
	spaceBetween: {
		type: Number,
		default: 30,
	},
	loop: {
		type: Boolean,
		default: true,
	},
	navigation: {
		type: Boolean,
		default: true,
	},
	customClass: {
		type: String,
		default: "",
	},
});

const swiper = ref(null);

const onSwiper = (swiperInstance) => {
	swiper.value = swiperInstance;
};

const modules = [Navigation];

defineExpose({
	swiper,
});
</script>

<style lang="scss">
/* Основной контейнер карусели */
.base-carousel {
	position: relative;
	width: 100%;
	overflow: hidden;
	height: 100%;
	display: block;
	margin: 0 auto;

	.swiper-fix {
		display: block;
		overflow: hidden;
		width: 100%;
		height: 100%;
		position: relative;
	}

	.swiper-slide-fix {
		display: flex !important;
		justify-content: center !important;
		align-items: center !important;
		width: 100% !important;
		height: auto !important;
	}

	/* Сам свайпер */
	.swiper {
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 1;

		&-container {
			margin-left: auto;
			margin-right: auto;
			position: relative;
			width: 100%;
		}

		/* Контейнер слайдов - тут главная проблема, поэтому много !important */
		&-wrapper {
			position: relative;
			width: 100%;
			height: 100%;
			display: flex !important;
			box-sizing: content-box;
			z-index: 1;
			flex-direction: row !important;
			transition-property: transform;
		}

		/* Отдельный слайд */
		&-slide {
			flex-shrink: 0 !important;
			width: 100% !important;
			height: auto !important;
			position: relative;
			transition-property: transform;
			display: flex !important;
			justify-content: center !important;
			align-items: center !important;
		}

		/* Стрелки навигации */
		&-button-next,
		&-button-prev {
			position: absolute;
			top: 50%;
			width: 50px !important;
			height: 50px !important;
			margin-top: -25px;
			z-index: 10;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			color: white !important;
			background: transparent !important;
			border-radius: 50% !important;
			font-weight: bold !important;
			text-shadow: 0 0 4px rgba(0, 0, 0, 0.5) !important;

			&:after {
				font-size: 24px !important;
				font-weight: 900 !important;
			}

			&:hover {
				background: rgba(0, 0, 0, 0.2) !important;
			}
		}
	}

	/* Изображение в слайде */
	&__slide-img {
		width: 100% !important;
		height: auto !important;
		object-fit: cover !important;
		border-radius: 0 !important;
		display: block !important;
		max-height: 70vh;
	}
}
</style> 