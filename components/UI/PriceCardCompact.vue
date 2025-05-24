<template>
	<q-card class="price-card-compact" flat bordered>
		<q-card-section class="price-card-compact__content">
			<h4 class="price-card-compact__title">{{ title }}</h4>
			<div class="price-card-compact__price">
				{{ formatPrice(price) }}
			</div>
		</q-card-section>
		<!-- Анимированные границы -->
		<span class="border border-top"></span>
		<span class="border border-right"></span>
		<span class="border border-bottom"></span>
		<span class="border border-left"></span>
	</q-card>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: [Number, String],
		required: true,
	},
	currency: {
		type: String,
		required: false,
		default: "Р",
	},
});

const formatPrice = (priceValue) => {
	if (typeof priceValue === "string" && priceValue.includes("от")) {
		return priceValue;
	}
	return `${priceValue} ${props.currency}`;
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/mixins" as *;

.price-card-compact {
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

	&__content {
		padding: 1rem 1.25rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	&__title {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 600;
		font-size: 0.875rem;
		text-transform: uppercase;
		color: var(--color-black);
		margin: 0;
		line-height: 1.2;
		flex: 1;

		@media (min-width: 768px) {
			font-size: 1rem;
		}
	}

	&__price {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 700;
		font-size: 0.875rem;
		color: var(--color-black);
		white-space: nowrap;

		@media (min-width: 768px) {
			font-size: 1rem;
		}
	}
}

// Добавляем CSS переменные если их нет
:root {
	--color-white: #ffffff;
	--color-black: #000000;
	--color-light-gray: #e5e5e5;
}
</style> 