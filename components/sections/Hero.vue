<template>
	<section class="hero-section q-py-lg">
		<div class="hero-content q-px-md">
			<div class="hero-text q-mb-lg">
				<h1 class="hero-title q-mb-sm">
					TON<br />
					Барбершоп
				</h1>
				<div class="hero-subtitle q-mb-md">МЕСТО СТИЛЯ</div>

				<div class="hero-description q-mb-lg">
					<p class="q-mb-sm">
						ton – это про внутреннюю силу человека.<br />
						про силу команды, дружбы и профессионализма.
					</p>
					<p class="q-mb-sm">
						клиенты возвращаются к нам за домашней,<br />
						расслабленной атмосферой и хорошими стрижками.
					</p>
					<p class="q-mb-sm">
						здесь работают только опытные мастера, которых мы<br />
						считаем своей семьей, а на полке всегда можно<br />
						найти качественные средства для бритья, ухода за<br />
						кожей и волосами.
					</p>
				</div>

				<UIMainButton
					label="ОНЛАЙН-ЗАПИСЬ"
					size="lg"
					custom-class="hero-btn q-py-sm q-px-lg"
					@click="bookingStore.openBooking()"
				/>
			</div>

			<div class="hero-image-wrapper">
				<UIBaseCarousel
					v-if="heroImages.length > 0"
					:slides-per-view="1"
					:space-between="0"
					:loop="true"
					:navigation="true"
					custom-class="hero-carousel"
					:image-sources="heroImages"
				/>
				<div v-else-if="heroStore.loading" class="hero-loading">
					Загрузка изображений...
				</div>
				<div v-else class="hero-fallback">
					<img src="~/assets/images/hero.webp" alt="TON Барбершоп" />
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking";
import { useHeroStore } from "@/stores/hero";
import { computed, onMounted } from "vue";

const bookingStore = useBookingStore();
const heroStore = useHeroStore();

// Получаем изображения из стора
const heroImages = computed(() =>
	heroStore.activeImages.map((img) => img.image_url)
);

// Загружаем данные при монтировании
onMounted(async () => {
	await heroStore.fetchImages();
});
</script>

<style scoped lang="scss">
.hero-section {
	background-color: var(--color-white);
	min-height: calc(100vh - 120px); // Примерная высота хедера и футера
	display: flex;
	align-items: center;
}

.hero-content {
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center; // Центрирование в мобильной версии

	@media (min-width: 740px) {
		flex-direction: row;
		align-items: stretch; // Выравниваем элементы по высоте
		justify-content: space-between;
	}
}

.hero-text {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: left;

	@media (min-width: 740px) {
		width: 48%;
		margin-bottom: 0;
		margin-right: 4%;
		text-align: left; // Выравнивание по левому краю на десктопе
	}
}

.hero-title {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 2.5rem;
	text-transform: uppercase;
	line-height: 1.2;

	@media (min-width: 768px) {
		font-size: 3.5rem;
	}
}

.hero-subtitle {
	font-family: "RF Dewi Condensed", sans-serif;
	font-size: 1.25rem;
	font-weight: 600;
}

.hero-description {
	font-family: "RF Dewi Condensed", sans-serif;

	p {
		color: var(--color-dark);
		font-size: 1.4rem;
		line-height: 1.2;
	}
}

.hero-btn {
	font-size: 1.1rem;
	align-self: center;

	@media (min-width: 740px) {
		align-self: flex-start;
	}
}

/* Стили для карусели */
.hero-image-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 300px;
	max-width: 450px; // Ограничиваем максимальную ширину для центрирования

	@media (min-width: 740px) {
		width: 48%;
		max-width: none; // Сбрасываем ограничение на десктопе
	}
}

.hero-carousel {
	width: 100%;
	margin: 0 auto;
	height: auto;
}

.hero-loading,
.hero-fallback {
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

.hero-loading {
	font-family: "RF Dewi Condensed", sans-serif;
	font-size: 1rem;
	color: var(--color-gray, #999);
	text-transform: uppercase;
	letter-spacing: 0.1em;
}
</style> 