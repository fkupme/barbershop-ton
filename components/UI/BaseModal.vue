<template>
	<q-dialog
		v-model="localValue"
		:persistent="persistent"
		:maximized="maximized"
		:full-height="fullHeight"
		:full-width="fullWidth"
		:position="position"
		@hide="$emit('hide')"
		@show="$emit('show')"
	>
		<q-card class="base-modal rounded-borders" :class="customClass">
			<q-card-section
				class="base-modal__header row items-center q-pa-md"
				v-if="title || $slots.header"
			>
				<div class="col">
					<slot name="header">
						<div class="text-h6">{{ title }}</div>
					</slot>
				</div>
				<q-btn
					v-if="!hideCloseButton"
					icon="close"
					flat
					round
					dense
					@click="close"
					class="base-modal__close"
				/>
			</q-card-section>

			<q-card-section class="base-modal__content q-pa-md">
				<slot></slot>
			</q-card-section>

			<q-card-actions
				v-if="$slots.footer"
				class="base-modal__footer q-px-md q-py-sm justify-end"
			>
				<slot name="footer"></slot>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		default: "",
	},
	persistent: {
		type: Boolean,
		default: false,
	},
	maximized: {
		type: Boolean,
		default: false,
	},
	fullHeight: {
		type: Boolean,
		default: false,
	},
	fullWidth: {
		type: Boolean,
		default: false,
	},
	position: {
		type: String,
		default: "standard",
		validator: (val) =>
			["standard", "top", "right", "bottom", "left"].includes(val),
	},
	hideCloseButton: {
		type: Boolean,
		default: false,
	},
	customClass: {
		type: String,
		default: "",
	},
});

const emit = defineEmits(["update:modelValue", "hide", "show"]);

const localValue = computed({
	get: () => props.modelValue,
	set: (value) => emit("update:modelValue", value),
});

const close = () => {
	emit("update:modelValue", false);
};
</script>

<style lang="scss">
.base-modal {
	max-width: 90vw;

	&__header {
		border-bottom: 1px solid var(--color-light-gray);

		.text-h6 {
			font-family: "RF Dewi Extended", sans-serif;
			font-weight: 700;
			margin: 0;
		}
	}

	&__footer {
		border-top: 1px solid var(--color-light-gray);
	}

	&__close {
		color: var(--color-dark);
		transition: all 0.3s ease;

		&:hover {
			color: black;
			background: var(--color-light-gray);
		}
	}
}
</style> 