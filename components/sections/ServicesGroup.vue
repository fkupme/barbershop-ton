<template>
	<div class="services-group">
		<div class="services-group__header" @click="toggleExpanded">
			<h3 class="services-group__title">{{ groupName }}</h3>
			<div class="services-group__toggle">
				<span
					class="services-group__count"
					v-if="!isExpanded && hasMoreServices"
				>
					+{{ hiddenServicesCount }}
				</span>
				<q-icon
					:name="isExpanded ? 'expand_less' : 'expand_more'"
					class="services-group__icon"
				/>
			</div>
		</div>
		<div class="services-group__separator"></div>

		<transition name="services-expand" mode="out-in">
			<div
				:key="isExpanded ? 'expanded' : 'collapsed'"
				class="services-group__content"
			>
				<transition-group name="services-card" tag="div" class="services-grid">
					<component
						:is="isCompactMode ? UIPriceCardCompact : UIPriceCard"
						v-for="service in displayedServices"
						:key="service.id"
						:number="service.id"
						:title="service.title"
						:description="service.description"
						:price="service.price"
						class="services-grid__item"
					/>
				</transition-group>
			</div>
		</transition>
	</div>
</template>

<script setup>
// Импортируем компоненты
const UIPriceCard = defineAsyncComponent(() =>
	import("~/components/UI/PriceCard.vue")
);
const UIPriceCardCompact = defineAsyncComponent(() =>
	import("~/components/UI/PriceCardCompact.vue")
);

const props = defineProps({
	groupName: {
		type: String,
		required: true,
	},
	services: {
		type: Array,
		required: true,
		default: () => [],
	},
	compactMode: {
		type: Boolean,
		default: true,
	},
	previewCount: {
		type: Number,
		default: 4,
	},
});

const isExpanded = ref(false);

const isCompactMode = computed(() => {
	return props.compactMode && !isExpanded.value;
});

const displayedServices = computed(() => {
	if (isExpanded.value) {
		return props.services;
	}
	return props.services.slice(0, props.previewCount);
});

const hasMoreServices = computed(() => {
	return props.services.length > props.previewCount;
});

const hiddenServicesCount = computed(() => {
	return Math.max(0, props.services.length - props.previewCount);
});

const toggleExpanded = () => {
	isExpanded.value = !isExpanded.value;
};
</script>

<style lang="scss" scoped>
.services-group {
	margin-bottom: 3rem;

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover {
			opacity: 0.8;
		}
	}

	&__title {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 600;
		font-size: 1.75rem;
		text-transform: uppercase;
		color: var(--color-black);
		margin: 0 0 1.5rem 0;
		line-height: 1.2;

		@media (min-width: 768px) {
			font-size: 2rem;
		}
		@media (max-width: 479px) {
			font-size: 1.5rem;
		}
	}

	&__toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	&__count {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--color-gray);
		background: var(--color-light-gray);
		padding: 0.25rem 0.5rem;
		border-radius: 12px;

		@media (min-width: 768px) {
			font-size: 1rem;
		}
	}

	&__icon {
		font-size: 1.5rem;
		color: var(--color-dark);
		transition: transform 0.3s ease;
	}

	&__separator {
		width: 100%;
		height: 2px;
		background-color: var(--color-light-gray);
		margin-bottom: 2rem;
	}

	&__content {
		overflow: hidden;
	}
}

.services-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem;

	@media (min-width: 576px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
	}

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	@media (min-width: 1024px) {
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
	}

	&__item {
		width: 100%;
		height: 100%;
	}
}

// Анимации
.services-expand-enter-active,
.services-expand-leave-active {
	transition: all 0.4s ease;
}

.services-expand-enter-from {
	opacity: 0;
	transform: translateY(-10px);
}

.services-expand-leave-to {
	opacity: 0;
	transform: translateY(10px);
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

// CSS переменные
:root {
	--color-white: #ffffff;
	--color-black: #000000;
	--color-dark: #333333;
	--color-gray: #999999;
	--color-light-gray: #e5e5e5;
}
</style> 