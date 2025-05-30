<template>
	<section class="marquee-section q-py-lg">
		<!-- SEO-заголовок, скрытый визуально -->
		<h2 class="marquee-title q-mb-md seo-hidden">НАША ФИЛОСОФИЯ</h2>

		<!-- Контейнер для основного содержимого -->
		<div class="marquee-main-content q-px-md q-py-xl">
			<!-- Изображения (первые на мобильных, слева на десктопе) -->
			<div class="marquee-image-wrapper">
				<UIBaseCarousel
					v-if="marqueeImages.length > 0"
					:slides-per-view="1"
					:space-between="0"
					:loop="true"
					:navigation="true"
					custom-class="marquee-carousel"
					:image-sources="marqueeImages"
				/>
				<div v-else-if="marqueeStore.loading" class="marquee-loading">
					Загрузка изображений...
				</div>
				<div v-else class="marquee-fallback">
					<img src="~/assets/images/hero.webp" alt="TON Барбершоп философия" />
				</div>
			</div>

			<!-- Текст (второй на мобильных, справа на десктопе) -->
			<div class="marquee-text">
				<!-- Бегущая строка -->
				<div class="marquee-container">
					<div class="marquee-content">
						<div class="marquee-item">
							СИЛА ВНУТРИ ⇔ СИЛА СНАРУЖИ ⇔ СИЛА ВНУТРИ ⇔ СИЛА СНАРУЖИ ⇔
						</div>
						<div class="marquee-item">
							СИЛА ВНУТРИ ⇔ СИЛА СНАРУЖИ ⇔ СИЛА ВНУТРИ ⇔ СИЛА СНАРУЖИ ⇔
						</div>
						<div class="marquee-item">
							СИЛА ВНУТРИ ⇔ СИЛА СНАРУЖИ ⇔ СИЛА ВНУТРИ ⇔ СИЛА СНАРУЖИ ⇔
						</div>
						<div class="marquee-item">
							СИЛА ВНУТРИ ⇔ СИЛА СНАРУЖИ ⇔ СИЛА ВНУТРИ ⇔ СИЛА СНАРУЖИ ⇔
						</div>
						<div class="marquee-item">
							СИЛА ВНУТРИ ⇔ СИЛА СНАРУЖИ ⇔ СИЛА ВНУТРИ ⇔ СИЛА СНАРУЖИ ⇔
						</div>
					</div>
				</div>
				<!-- Описание -->
				<div class="marquee-description">
					<p class="q-mb-md">
						МЫ ВЕРИМ, ЧТО ВНЕШНИЙ ВИД ИМЕЕТ СВОЮ СИЛУ, КОТОРАЯ<br />
						ВЗАИМОСВЯЗАНА СО ВНУТРЕННЕЙ СИЛОЙ ЧЕЛОВЕКА
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useMarqueeStore } from "@/stores/marquee";
import { computed, onMounted } from "vue";

const marqueeStore = useMarqueeStore();

// Получаем изображения из стора
const marqueeImages = computed(() =>
	marqueeStore.activeImages.map((img) => img.image_url)
);

// Загружаем данные при монтировании
onMounted(async () => {
	await marqueeStore.fetchImages();
});
</script>

<style lang="scss">
.marquee-section {
	overflow: hidden;
}

// Основной контент секции с flex-direction
.marquee-main-content {
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: column; // На мобильных в столбик
	width: 100%;
	align-items: center;
	gap: 2rem;

	@media (min-width: 740px) {
		flex-direction: row; // На десктопе в ряд
		align-items: stretch;
		justify-content: space-between;
		gap: 3rem;
	}
}

// Контейнер для текста
.marquee-text {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: left;
	width: 100%;
	order: 1; // На мобилках текст будет первым (сверху)

	@media (min-width: 740px) {
		width: 48%;
		margin-bottom: 0;
		order: 2; // На десктопе текст остается справа
	}
}

// Контейнер для бегущей строки
.marquee-container {
	width: 100%;
	overflow: hidden;
	color: var(--color-black, #000);
	padding: 1rem 0;
	margin-bottom: 1.5rem;
}

// Анимация бегущей строки
.marquee-content {
	display: flex;
	white-space: nowrap;
	animation: marquee 10s linear infinite;
}

@keyframes marquee {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-33.33%); // Анимация на 1/3 контента для 3 повторов
	}
}

.marquee-item {
	display: inline-block;
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 1.8rem;
	text-transform: uppercase;
	padding-right: 20px;

	@media (min-width: 768px) {
		font-size: 2rem;
	}

	@media (max-width: 479px) {
		font-size: 1.6rem;
	}
}

// Скрытый заголовок для SEO
.marquee-title {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 2.5rem;
	text-transform: uppercase;
	line-height: 1.2;

	@media (min-width: 768px) {
		font-size: 3rem;
	}

	&.seo-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
}

// Описание
.marquee-description {
	font-family: "RF Dewi Condensed", sans-serif;
	text-transform: lowercase;
	font-family: "RF Dewi Condensed", sans-serif;

	p {
		color: var(--color-dark);
		font-size: 1.4rem;
		line-height: 1.2;
		text-align: center;
		@media (min-width: 740px) {
			text-align: left;
		}
	}
}

// Контейнер для изображений
.marquee-image-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 300px;
	max-width: 450px;
	order: 2; // На мобилках изображения будут вторыми (снизу)

	@media (min-width: 740px) {
		width: 48%;
		max-width: none;
		order: 1; // На десктопе изображения остаются слева
	}

	@media (max-width: 479px) {
		min-height: 250px;
	}
}

// Стили для карусели
.marquee-carousel {
	width: 100%;
	margin: 0 auto;
	height: auto;
}

.marquee-loading,
.marquee-fallback {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 300px;
	background-color: var(--color-light-gray, #f5f5f5);
	border-radius: 8px;

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
		border-radius: 8px;
	}
}

.marquee-loading {
	font-family: "RF Dewi Condensed", sans-serif;
	font-size: 1rem;
	color: var(--color-gray, #999);
	text-transform: uppercase;
	letter-spacing: 0.1em;
}
</style> 