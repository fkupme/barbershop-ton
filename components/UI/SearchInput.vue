<template>
	<div class="search-input">
		<div class="search-input__container">
			<!-- Поле поиска -->
			<div class="search-input__field">
				<input
					v-model="localSearchQuery"
					type="text"
					placeholder="Поиск услуг..."
					class="search-input__input"
					@input="handleSearchInput"
				/>
				<div class="search-input__icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.35-4.35"></path>
					</svg>
				</div>
			</div>

			<!-- Кнопка очистки -->
			<button
				v-if="hasActiveFilters"
				@click="clearAllFilters"
				class="search-input__clear"
				type="button"
			>
				Очистить
			</button>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	searchQuery: {
		type: String,
		default: "",
	},
});

const emit = defineEmits(["update:searchQuery", "clear-filters"]);

// Локальные реактивные значения
const localSearchQuery = ref(props.searchQuery);

// Обработчики
const handleSearchInput = () => {
	emit("update:searchQuery", localSearchQuery.value);
};

const clearAllFilters = () => {
	localSearchQuery.value = "";
	emit("clear-filters");
};

// Проверка наличия активных фильтров
const hasActiveFilters = computed(() => {
	return localSearchQuery.value.trim() !== "";
});

// Следим за изменениями пропсов
watch(
	() => props.searchQuery,
	(newValue) => {
		localSearchQuery.value = newValue;
	}
);
</script>

<style lang="scss" scoped>
.search-input {
	width: 100%;
	margin-bottom: 2rem;

	&__container {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;

		@media (max-width: 768px) {
			flex-direction: column;
			align-items: stretch;
		}
	}

	&__field {
		position: relative;
		flex: 1;
		min-width: 250px;

		@media (max-width: 768px) {
			min-width: 100%;
		}
	}

	&__input {
		width: 100%;
		padding: 0.75rem 2.5rem 0.75rem 1rem;
		border: 2px solid var(--color-light-gray, #e5e5e5);
		border-radius: 0;
		font-size: 1rem;
		background-color: var(--color-white, #ffffff);
		transition: border-color 0.3s ease;

		&:focus {
			outline: none;
			border-color: var(--color-dark, #333333);
		}

		&::placeholder {
			color: var(--color-gray, #999999);
		}
	}

	&__icon {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-gray, #999999);
		pointer-events: none;
	}

	&__clear {
		padding: 0.75rem 1.5rem;
		border: 2px solid var(--color-dark, #333333);
		border-radius: 0;
		background-color: transparent;
		color: var(--color-dark, #333333);
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		white-space: nowrap;

		&:hover {
			background-color: var(--color-dark, #333333);
			color: var(--color-white, #ffffff);
		}

		@media (max-width: 768px) {
			width: 100%;
		}
	}
}
</style> 