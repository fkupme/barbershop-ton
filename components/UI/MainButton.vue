<template>
	<q-btn
		outline
		color="black"
		:class="['main-button', customClass]"
		:label="label"
		:size="size"
		v-bind="$attrs"
		@click="$emit('click')"
	/>
</template>

<script setup>
defineProps({
	label: {
		type: String,
		required: true,
	},
	size: {
		type: String,
		default: "md",
	},
	customClass: {
		type: String,
		default: "",
	},
});

defineEmits(["click"]);
</script>

<style lang="scss" scoped>
.main-button {
	font-family: "RF Dewi Extended", sans-serif !important;
	font-weight: 600 !important;
	text-transform: uppercase !important;
	border: 2px solid var(--color-black) !important;
	border-radius: 0 !important;
	background: transparent !important;
	color: var(--color-black) !important;
	position: relative !important;
	overflow: hidden !important;
	transition: color 0.3s ease, transform 0.2s ease !important;

	&::before {
		content: "" !important;
		position: absolute !important;
		bottom: 0 !important;
		left: 0 !important;
		width: 100% !important;
		height: 0 !important;
		background: var(--color-black) !important;
		transition: height 0.3s ease !important;
		z-index: -1 !important;
	}

	&:hover:not(:active) {
		color: var(--color-white) !important;
		z-index: 1 !important;
		transition: height 0.3s ease !important;

		&::before {
			height: 100% !important;
			transition: height 0.3s ease !important;
		}
	}

	&:active {
		transform: scale(0.95) !important;
		color: var(--color-white) !important;
		background: var(--color-black) !important;
		z-index: 1 !important;
	}
}

:root {
	--color-black: #000000;
	--color-white: #ffffff;
}
</style> 