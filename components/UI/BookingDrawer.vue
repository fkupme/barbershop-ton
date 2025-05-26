<template>
	<!-- Drawer для экранов больше 640px -->
	<q-drawer
		v-if="!isMobile"
		v-model="bookingStore.isBookingOpen"
		side="right"
		overlay
		bordered
		:width="400"
		class="booking-drawer"
		swipe-to-close
	>
		<div class="booking-drawer__content">
			<div class="booking-drawer__header">
				<h3 class="booking-drawer__title">Запись на услугу</h3>
				<q-btn
					flat
					round
					dense
					icon="close"
					@click="bookingStore.closeBooking"
					class="booking-drawer__close"
				/>
			</div>
			<div class="booking-drawer__body">
				<p v-if="bookingStore.selectedService">
					Выбранная услуга: {{ bookingStore.selectedService.title }}
				</p>
				<p>Здесь будет форма записи...</p>
			</div>
		</div>
	</q-drawer>

	<!-- Bottom Sheet для экранов меньше 640px -->
	<q-dialog
		v-else
		v-model="bookingStore.isBookingOpen"
		position="bottom"
		class="booking-bottom-sheet"
		maximized
		transition-show="slide-up"
		transition-hide="slide-down"
	>
		<q-card
			class="booking-bottom-sheet__card"
			v-touch-swipe.mouse.down="handleSwipeDown"
		>
			<div class="booking-bottom-sheet__handle"></div>
			<q-card-section class="booking-bottom-sheet__header">
				<h3 class="booking-bottom-sheet__title">Запись на услугу</h3>
				<q-btn
					flat
					round
					dense
					icon="close"
					@click="bookingStore.closeBooking"
					class="booking-bottom-sheet__close"
				/>
			</q-card-section>
			<q-card-section class="booking-bottom-sheet__body">
				<p v-if="bookingStore.selectedService">
					Выбранная услуга: {{ bookingStore.selectedService.title }}
				</p>
				<p>Здесь будет форма записи...</p>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script setup>
import { useBookingStore } from "@/stores/booking";
import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

const bookingStore = useBookingStore();
const { width } = useWindowSize();

const isMobile = computed(() => width.value < 640);

const handleSwipeDown = () => {
	bookingStore.closeBooking();
};
</script>

<style lang="scss" scoped>
.booking-drawer {
	&__content {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	&__header {
		padding: 1.5rem;
		border-bottom: 1px solid var(--color-light-gray, #e5e5e5);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__title {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 700;
		font-size: 1.25rem;
		margin: 0;
		color: var(--color-black);
	}

	&__close {
		color: var(--color-gray);
	}

	&__body {
		padding: 1.5rem;
		flex: 1;
		overflow-y: auto;
	}
}

.booking-bottom-sheet {
	&__card {
		width: 100%;
		max-height: 80vh;
		border-radius: 1rem 1rem 0 0;
		position: relative;
	}

	&__handle {
		width: 40px;
		height: 4px;
		background: var(--color-light-gray);
		border-radius: 2px;
		margin: 0.75rem auto 0;
		cursor: grab;

		&:active {
			cursor: grabbing;
		}
	}

	&__header {
		padding: 1.5rem 1.5rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__title {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 700;
		font-size: 1.25rem;
		margin: 0;
		color: var(--color-black);
	}

	&__close {
		color: var(--color-gray);
	}

	&__body {
		padding: 0 1.5rem 1.5rem;
		max-height: 60vh;
		overflow-y: auto;
	}
}

:root {
	--color-black: #000000;
	--color-gray: #999999;
	--color-light-gray: #e5e5e5;
}
</style> 