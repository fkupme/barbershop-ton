<template>
	<q-card
		class="price-card-compact"
		:class="{ selected: isSelected }"
		flat
		bordered
		@click.stop="handleCardClick"
	>
		<div class="price-card-compact__container">
			<q-card-section class="price-card-compact__content">
				<h4 class="price-card-compact__title">{{ title }}</h4>
				<div class="price-card-compact__price">
					{{ formatPrice(price) }}
				</div>
			</q-card-section>
			<q-card-section v-if="isSelected" class="price-card-compact__button">
				<q-btn
					label="записаться"
					no-caps
					flat
					unelevated
					class="price-card-compact__button-btn"
					@click.stop="handleBookingClick"
					:icon="'event'"
				/>
			</q-card-section>
		</div>
		<!-- Анимированные границы -->
		<span class="border border-top"></span>
		<span class="border border-right"></span>
		<span class="border border-bottom"></span>
		<span class="border border-left"></span>
	</q-card>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking";
import { useServicesStore } from "@/stores/services";
import { computed } from "vue";

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
	number: {
		type: Number,
		required: true,
	},
});

const servicesStore = useServicesStore();
const bookingStore = useBookingStore();

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
	if (!isSelected.value) {
		servicesStore.selectService(props.number);
	}
};

const handleBookingClick = () => {
	const serviceData = {
		number: props.number,
		title: props.title,
		price: props.price,
	};
	bookingStore.openBooking(serviceData);
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
	&__container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		height: 100%;
	}
	&__button {
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: flex-end;
	}
	&__button-btn {
		background: var(--color-black);
		color: var(--color-white);
		padding: 0.5rem 1.25rem;
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 600;
		text-transform: uppercase;
		border-radius: 0;
		transition: all 0.3s ease;
		margin-bottom: 0.5rem;
		margin-right: 0.5rem;

		&:hover {
			background: var(--color-dark);
		}

		&:active {
			transform: scale(0.98);
		}
	}
	&:hover {
		border-color: var(--color-black);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	&.selected {
		border-color: var(--color-black);
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
	--color-dark: #333333;
	--color-light-gray: #e5e5e5;
}
</style> 