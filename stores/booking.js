import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookingStore = defineStore('booking', () => {
	const isBookingOpen = ref(false)
	const selectedService = ref(null)

	const openBooking = (service = null) => {
		selectedService.value = service
		isBookingOpen.value = true
	}

	const closeBooking = () => {
		isBookingOpen.value = false
		selectedService.value = null
	}

	return {
		isBookingOpen,
		selectedService,
		openBooking,
		closeBooking
	}
}) 