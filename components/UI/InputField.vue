<template>
	<UIBaseInput
		v-bind="$attrs"
		:model-value="modelValue"
		:label="label"
		:type="type"
		:autocomplete="autocomplete"
		:disable="disable || loading"
		:outlined="true"
		:dense="false"
		@update:model-value="$emit('update:modelValue', $event)"
		@blur="$emit('blur')"
		@focus="$emit('focus')"
	>
		<template v-if="$slots.prepend" v-slot:prepend>
			<slot name="prepend"></slot>
		</template>
		<template v-if="$slots.append" v-slot:append>
			<slot name="append"></slot>
		</template>
	</UIBaseInput>
</template>

<script setup>
defineProps({
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
	autocomplete: {
		type: String,
		default: "",
	},
	disable: {
		type: Boolean,
		default: false,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

defineEmits(["update:modelValue", "blur", "focus"]);
</script> 