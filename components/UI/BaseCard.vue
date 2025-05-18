<template>
	<q-card
		class="base-card rounded-borders"
		:class="customClass"
		:flat="flat"
		:bordered="bordered"
	>
		<q-card-section v-if="$slots.header" class="base-card__header q-pa-md">
			<slot name="header"></slot>
		</q-card-section>

		<q-card-section class="base-card__content q-pa-md">
			<slot></slot>
		</q-card-section>

		<q-card-section
			v-if="$slots.footer"
			class="base-card__footer q-px-md q-py-sm"
		>
			<slot name="footer"></slot>
		</q-card-section>
	</q-card>
</template>

<script setup>
defineProps({
	flat: {
		type: Boolean,
		default: false,
	},
	bordered: {
		type: Boolean,
		default: true,
	},
	customClass: {
		type: String,
		default: "",
	},
});
</script>

<style lang="scss">
.base-card {
	background: var(--color-white);
	transition: all 0.3s ease;

	&:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	&__header {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 700;
		font-size: 1.25rem;
		border-bottom: 1px solid var(--color-light-gray);
	}

	&__footer {
		border-top: 1px solid var(--color-light-gray);
	}
}
</style> 