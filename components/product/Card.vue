<template>
	<div class="product-card">
		<div class="product-card__image">
			<Icon :name="image" class="product-card__icon" />
		</div>
		<div class="product-card__content">
			<h3 class="product-card__title">{{ title }}</h3>
			<p class="product-card__description">{{ description }}</p>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});
</script>

<style lang="scss" scoped>
.product-card {
	background: var(--color-white, #ffffff);
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.product-card__image {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1rem;
	padding: 2rem;
	background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
	min-height: 340px;
	max-width: 300px;
	width: 100%;
}

.product-card__icon {
	font-size: 3.5rem;
	color: var(--color-black, #000);
}

.product-card__content {
	flex: 1;
	padding: 1rem;
	border: 1px solid var(--color-black, #000);
	max-width: 300px;
}

.product-card__title {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 1.1rem;
	text-transform: uppercase;
	line-height: 1.3;
	color: var(--color-black, #000);
	margin: 0 0 0.75rem 0;
	letter-spacing: 0.5px;

	@media (max-width: 479px) {
		font-size: 1rem;
	}
}

.product-card__description {
	font-family: "RF Dewi Condensed", sans-serif;
	font-size: 0.95rem;
	line-height: 1.4;
	color: var(--color-gray, #666);
	margin: 0;
	text-transform: lowercase;

	@media (max-width: 479px) {
		font-size: 0.9rem;
	}
}

// CSS переменные если их нет
:root {
	--color-white: #ffffff;
	--color-black: #000000;
	--color-dark: #333333;
	--color-gray: #666666;
}
</style> 