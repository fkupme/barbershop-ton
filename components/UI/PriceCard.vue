<template>
	<q-card
		class="price-card"
		:class="{ selected: isSelected }"
		flat
		bordered
		@click="handleCardClick"
	>
		<q-card-section class="price-card__header">
			<div class="price-card__number">{{ numberFormatted }}</div>
			<h3 class="price-card__title">{{ title }}</h3>
		</q-card-section>
		<q-card-section class="price-card__content">
			<div class="price-card__prices" v-if="prices && prices.length">
				<span
					v-for="(price, index) in prices"
					:key="index"
					class="price-card__price"
				>
					{{ formatPrice(price) }}
				</span>
			</div>
			<div class="price-card__single-price" v-else-if="price">
				{{ formatPrice(price) }}
			</div>
			<p class="price-card__description" v-if="description">
				{{ description }}
			</p>
		</q-card-section>
		<!-- Анимированные границы -->
		<span class="border border-top"></span>
		<span class="border border-right"></span>
		<span class="border border-bottom"></span>
		<span class="border border-left"></span>
	</q-card>
</template>

<script setup>
import { useServicesStore } from "@/stores/services"
import { computed } from "vue"

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
		default: "",
	},
	price: {
		type: [Number, String],
		required: false,
	},
	prices: {
		type: Array,
		required: false,
		default: () => [],
	},
	currency: {
		type: String,
		required: false,
		default: "Р",
	},
	number: {
		type: Number,
		required: true,
	},
});

const servicesStore = useServicesStore();

const numberFormatted = computed(() => {
	return props.number.toString().padStart(2, "0");
});

const formatPrice = (priceValue) => {
	if (typeof priceValue === "string" && priceValue.includes("от")) {
		return priceValue;
	}
	return `${priceValue} ${props.currency}`;
};

const isSelected = computed(() => {
	return servicesStore.isSelected(props.number);
});

const handleCardClick = () => {
	if (isSelected.value) {
		servicesStore.clearSelection();
	} else {
		servicesStore.selectService(props.number);
	}
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/mixins" as *;

.price-card {
	background: var(--color-white);
	border: 1px solid var(--color-light-gray, #e5e5e5);
	border-radius: 0;
	transition: all 0.3s ease;
	height: 100%;
	display: flex;
	flex-direction: column;
	cursor: pointer;

	@include card-borders-animation;

	&:hover {
		border-color: var(--color-black);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	&__header {
		padding: 1.5rem 1.5rem 1rem;
		border-bottom: 1px solid var(--color-light-gray, #e5e5e5);
		flex-shrink: 0;
	}

	&__number {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 400;
		font-size: 0.875rem;
		color: var(--color-gray, #999);
		margin-bottom: 0.5rem;
	}

	&__title {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 700;
		font-size: 1.125rem;
		text-transform: uppercase;
		color: var(--color-black);
		margin: 0;
		line-height: 1.3;

		@media (min-width: 768px) {
			font-size: 1.25rem;
		}
	}

	&__content {
		padding: 1.5rem;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	&__prices {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	&__price,
	&__single-price {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 700;
		font-size: 1rem;
		color: var(--color-black);

		@media (min-width: 768px) {
			font-size: 1.125rem;
		}
	}

	&__prices &__price:not(:last-child)::after {
		content: " /";
		color: var(--color-gray);
		margin-left: 2px;
	}

	&__description {
		font-family: "RF Dewi Condensed", sans-serif;
		font-size: 0.875rem;
		color: var(--color-dark);
		line-height: 1.4;
		margin: 0;
		text-transform: lowercase;

		@media (min-width: 768px) {
			font-size: 1rem;
		}
	}
}

// Добавляем CSS переменные если их нет
:root {
	--color-white: #ffffff;
	--color-black: #000000;
	--color-dark: #333333;
	--color-gray: #999999;
	--color-light-gray: #e5e5e5;
}
</style>
