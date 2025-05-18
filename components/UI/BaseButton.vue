<template>
	<q-btn
		:label="label"
		:color="color"
		:flat="flat"
		:outline="outline"
		:rounded="rounded"
		:size="size"
		:icon="icon"
		:loading="loading"
		:disable="disable"
		class="base-button"
		:class="customClass"
		@click="$emit('click')"
	/>
</template>

<script setup>
defineProps({
	label: {
		type: String,
		default: "",
	},
	color: {
		type: String,
		default: "black",
	},
	flat: {
		type: Boolean,
		default: false,
	},
	outline: {
		type: Boolean,
		default: false,
	},
	rounded: {
		type: Boolean,
		default: true,
	},
	size: {
		type: String,
		default: "md",
	},
	icon: {
		type: String,
		default: "",
	},
	loading: {
		type: Boolean,
		default: false,
	},
	disable: {
		type: Boolean,
		default: false,
	},
	customClass: {
		type: String,
		default: "",
	},
});

defineEmits(["click"]);
</script>

<style lang="scss">
.base-button {
	font-family: "RF Dewi Condensed", sans-serif;
	font-weight: 600;
	text-transform: uppercase;
	transition: all 0.3s ease;

	&.q-btn--outline {
		color: var(--color-dark);
		border-color: var(--color-dark);

		&:hover {
			background: var(--color-dark);
			color: var(--color-white);
		}
	}

	&.q-btn--flat {
		&:hover {
			background: var(--color-light-gray);
		}
	}
}
</style> 