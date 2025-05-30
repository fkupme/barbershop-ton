<template>
	<button
		:class="[
			'admin-button',
			`admin-button--${variant}`,
			{ 'admin-button--loading': loading, 'admin-button--disabled': disabled },
			customClass,
		]"
		:disabled="disabled || loading"
		@click="$emit('click')"
	>
		<span v-if="!loading" class="admin-button__text">{{ label }}</span>
		<span v-else class="admin-button__text">ЗАГРУЗКА...</span>
	</button>
</template>

<script setup>
defineProps({
	label: {
		type: String,
		required: true,
	},
	variant: {
		type: String,
		default: "primary",
		validator: (value) =>
			["primary", "secondary", "danger", "success"].includes(value),
	},
	loading: {
		type: Boolean,
		default: false,
	},
	disabled: {
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

<style lang="scss" scoped>
.admin-button {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	padding: 0.75rem 1.5rem;
	border: 2px solid #000000;
	border-radius: 0;
	background: #ffffff;
	color: #000000;
	cursor: pointer;
	transition: all 0.2s ease;
	font-size: 0.9rem;
	min-height: 44px;
	position: relative;

	&:hover {
		background: #000000;
		color: #ffffff;
	}

	&:active:not(:disabled) {
		transform: translate(2px, 2px);
	}

	&--primary {
		background: #ffffff;
		color: #000000;
		border-color: #000000;

		&:hover:not(:disabled) {
			background: #000000;
		}
	}

	&--secondary {
		background: transparent;
		color: #000000;
		border-color: #666666;

		&:hover:not(:disabled) {
			background: #666666;
			color: #ffffff;
			border-color: #666666;
		}
	}

	&--danger {
		background: #ffffff;
		color: #dc2626;
		border-color: #dc2626;

		&:hover:not(:disabled) {
			background: #dc2626;
			color: #ffffff;
		}
	}

	&--success {
		background: #ffffff;
		color: #16a34a;
		border-color: #16a34a;

		&:hover:not(:disabled) {
			background: #16a34a;
			color: #ffffff;
		}
	}

	&--loading,
	&--disabled {
		opacity: 0.6;
		cursor: not-allowed;
		pointer-events: none;
	}

	&.full-width {
		width: 100%;
	}
}

.admin-button__text {
	display: block;
}
</style> 