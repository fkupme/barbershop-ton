<template>
	<div class="base-input q-mb-md" :class="{ 'base-input--error': error }">
		<label v-if="label" class="base-input__label q-mb-xs">{{ label }}</label>
		<q-input
			v-model="localValue"
			:type="type"
			:placeholder="placeholder"
			:disable="disable"
			:readonly="readonly"
			:dense="dense"
			:filled="filled"
			:outlined="outlined"
			:dark="dark"
			:hint="hint"
			:error="!!error"
			:error-message="error"
			:class="inputClass"
			@update:model-value="onInput"
			@blur="$emit('blur')"
			@focus="$emit('focus')"
		>
			<template v-if="$slots.prepend" v-slot:prepend>
				<slot name="prepend"></slot>
			</template>
			<template v-if="$slots.append" v-slot:append>
				<slot name="append"></slot>
			</template>
		</q-input>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	modelValue: {
		type: [String, Number],
		default: "",
	},
	label: {
		type: String,
		default: "",
	},
	type: {
		type: String,
		default: "text",
	},
	placeholder: {
		type: String,
		default: "",
	},
	disable: {
		type: Boolean,
		default: false,
	},
	readonly: {
		type: Boolean,
		default: false,
	},
	dense: {
		type: Boolean,
		default: true,
	},
	filled: {
		type: Boolean,
		default: false,
	},
	outlined: {
		type: Boolean,
		default: true,
	},
	dark: {
		type: Boolean,
		default: false,
	},
	hint: {
		type: String,
		default: "",
	},
	error: {
		type: String,
		default: "",
	},
	inputClass: {
		type: String,
		default: "",
	},
});

const emit = defineEmits(["update:modelValue", "input", "blur", "focus"]);

const localValue = computed({
	get: () => props.modelValue,
	set: (value) => emit("update:modelValue", value),
});

const onInput = (value) => {
	emit("input", value);
};
</script>

<style lang="scss">
.base-input {
	&__label {
		display: block;
		font-family: "RF Dewi Condensed", sans-serif;
		font-weight: 600;
		color: var(--color-dark);
	}

	.q-field {
		&--outlined {
			.q-field__control {
				border-color: rgba(0, 0, 0, 0.3);
			}

			&.q-field--focused {
				.q-field__control {
					border-color: var(--color-dark);
				}
			}
		}

		&--error {
			.q-field__control {
				border-color: var(--color-error);
			}
		}
	}
}
</style> 