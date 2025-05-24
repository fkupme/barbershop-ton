<template>
	<section class="services-section q-py-lg">
		<!-- SEO-заголовок -->
		<div class="services-header q-mb-xl">
			<h2 class="services-title q-mb-md">ЦЕНЫ И УСЛУГИ</h2>
		</div>

		<!-- Контейнер для поиска и фильтров -->
		<div class="services-controls q-px-md q-mb-lg">
			<UISearchInput
				:search-query="servicesStore.searchQuery"
				@update:search-query="servicesStore.setSearchQuery"
				@clear-filters="servicesStore.clearFilters"
			/>
		</div>

		<!-- Контейнер для контента -->
		<div class="services-content q-px-md">
			<!-- Отображение по группам если нет поискового запроса -->
			<transition-group
				v-if="!hasActiveFilters"
				name="services-group"
				tag="div"
				class="services-groups"
			>
				<ServicesGroup
					v-for="(group, categoryKey) in servicesStore.groupedServices"
					:key="categoryKey"
					:group-name="group.name"
					:services="group.services"
					:compact-mode="true"
					:preview-count="4"
				/>
			</transition-group>
			<!-- Отображение результатов поиска -->
			<transition v-else name="services-fade" mode="out-in">
				<div
					v-if="servicesStore.searchServices.length > 0"
					key="results"
					class="services-search-results"
				>
					<transition-group
						name="services-card"
						tag="div"
						class="services-grid"
					>
						<UIPriceCard
							v-for="service in servicesStore.searchServices"
							:key="service.id"
							:number="service.id"
							:title="service.title"
							:description="service.description"
							:price="service.price"
							class="services-grid__item"
						/>
					</transition-group>
				</div>
				<div v-else key="no-results" class="services-no-results">
					<h3>Услуги не найдены</h3>
					<p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
				</div>
			</transition>
		</div>
	</section>
</template>

<script setup>
// Импортируем компонент группы
const ServicesGroup = defineAsyncComponent(() =>
	import("~/components/sections/ServicesGroup.vue")
);

// Используем стор с услугами
const servicesStore = useServicesStore();

// Проверяем есть ли активные фильтры
const hasActiveFilters = computed(() => {
	return servicesStore.searchQuery.trim() !== "";
});
</script>

<style lang="scss">
.services-section {
	background-color: var(--color-white);
	overflow: hidden;
	min-height: 60vh;
}

.services-header {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1rem;
	text-align: center;

	@media (min-width: 740px) {
		text-align: left;
	}
}

.services-title {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 2.5rem;
	text-transform: uppercase;
	line-height: 1.2;
	color: var(--color-black);
	margin: 0;
	margin-bottom: 1rem;

	@media (min-width: 768px) {
		font-size: 3rem;
	}

	@media (max-width: 479px) {
		font-size: 2rem;
	}
}

.services-controls {
	max-width: 1200px;
	margin: 0 auto;
	width: 100%;
}

.services-content {
	max-width: 1200px;
	margin: 0 auto;
	width: 100%;
}

.services-groups {
	// Стили для групп услуг
}

.services-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 1.5rem;

	@media (min-width: 576px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		grid-template-columns: repeat(4, 1fr);
	}

	&__item {
		width: 100%;
		height: 100%;
	}
}

.services-search-results {
	// Стили для результатов поиска
}

.services-no-results {
	text-align: center;
	padding: 3rem 1rem;
	color: var(--color-gray);

	h3 {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 600;
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: var(--color-dark);
	}

	p {
		font-size: 1rem;
		line-height: 1.5;
		margin: 0;
	}
}

// Транзишны
.services-group-enter-active,
.services-group-leave-active {
	transition: all 0.5s ease;
}
.services-group-enter-from,
.services-group-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
.services-card-enter-active,
.services-card-leave-active {
	transition: all 0.3s ease;
}
.services-card-enter-from,
.services-card-leave-to {
	opacity: 0;
	transform: scale(0.9) translateY(20px);
}
.services-fade-enter-active,
.services-fade-leave-active {
	transition: opacity 0.3s ease;
}
.services-fade-enter-from,
.services-fade-leave-to {
	opacity: 0;
}

// CSS переменные если их нет
:root {
	--color-white: #ffffff;
	--color-black: #000000;
	--color-dark: #333333;
	--color-gray: #999999;
	--color-light-gray: #e5e5e5;
}
</style> 