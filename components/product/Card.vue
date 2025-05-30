<template>
	<div class="product-card">
		<div class="product-card__image">
			<img
				v-if="image"
				:src="image"
				:alt="title"
				class="product-card__img"
				@error="handleImageError"
			/>
			<div v-else class="product-card__placeholder">
				<Icon name="mdi:image-outline" class="product-card__icon" />
			</div>
		</div>
		<div class="product-card__content">
			<h3 class="product-card__title">{{ title }}</h3>
			<p class="product-card__description">{{ description }}</p>

			<!-- Автокомплит для категорий -->
			<div v-if="showCategoryInput" class="product-card__category">
				<label class="category-label">КАТЕГОРИЯ:</label>
				<input
					v-model="categoryInput"
					@input="filterCategories"
					@focus="showDropdown = true"
					@blur="hideDropdown"
					class="category-input"
					placeholder="Введите или выберите категорию"
					autocomplete="off"
				/>
				<div
					v-if="showDropdown && filteredCategories.length"
					class="category-dropdown"
				>
					<div
						v-for="category in filteredCategories"
						:key="category.code"
						@mousedown="selectCategory(category)"
						class="category-option"
					>
						<span class="category-code">{{ category.code }}</span>
						<span class="category-name">{{ category.name }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	showCategoryInput: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["categorySelected"]);

// Реактивные данные
const categoryInput = ref("");
const showDropdown = ref(false);
const categories = ref([]);
const filteredCategories = ref([]);

// Получение категорий из БД
onMounted(async () => {
	if (props.showCategoryInput) {
		try {
			const response = await $fetch("/api/categories");
			if (response && response.success && response.data) {
				categories.value = response.data;
				filteredCategories.value = response.data;
			}
		} catch (error) {
			console.error("Ошибка получения категорий:", error);
			// Показываем дефолтные категории при ошибке
			categories.value = [
				{ id: 1, code: "hair", name: "Уход за волосами" },
				{ id: 2, code: "beard", name: "Уход за бородой" },
				{ id: 3, code: "style", name: "Стрижки" },
			];
			filteredCategories.value = categories.value;
		}
	}
});

const handleImageError = (event) => {
	// Скрываем битое изображение и показываем placeholder
	event.target.style.display = "none";
	const parent = event.target.parentElement;
	if (parent) {
		parent.innerHTML =
			'<div class="product-card__placeholder"><Icon name="mdi:image-outline" class="product-card__icon" /></div>';
	}
};

const filterCategories = () => {
	if (!categoryInput.value.trim()) {
		filteredCategories.value = categories.value;
		return;
	}

	const search = categoryInput.value.toLowerCase();
	filteredCategories.value = categories.value.filter(
		(category) =>
			category.code.toLowerCase().includes(search) ||
			category.name.toLowerCase().includes(search)
	);
};

const selectCategory = (category) => {
	categoryInput.value = category.code;
	showDropdown.value = false;
	emit("categorySelected", category);
};

const hideDropdown = () => {
	setTimeout(() => {
		showDropdown.value = false;
	}, 200);
};
</script>

<style lang="scss" scoped>
.product-card {
	background: #ffffff;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.product-card__image {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1rem;
	padding: 2rem;
	background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
	min-height: 340px;
	max-width: 300px;
	width: 100%;
	overflow: hidden;

	@media (max-width: 768px) {
		min-height: 240px;
		max-width: 250px;
		padding: 1rem;
	}

	@media (max-width: 480px) {
		min-height: 200px;
		max-width: 200px;
		padding: 0.5rem;
	}
}

.product-card__img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	max-height: 300px;

	@media (max-width: 768px) {
		max-height: 200px;
	}

	@media (max-width: 480px) {
		max-height: 160px;
	}
}

.product-card__placeholder {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.product-card__icon {
	font-size: 3.5rem;
	color: #000000;

	@media (max-width: 768px) {
		font-size: 2.5rem;
	}

	@media (max-width: 480px) {
		font-size: 2rem;
	}
}

.product-card__content {
	flex: 1;
	padding: 1rem;
	border: 1px solid #000000;
	max-width: 300px;
	width: 100%;

	@media (max-width: 768px) {
		max-width: 250px;
		padding: 0.75rem;
	}

	@media (max-width: 480px) {
		max-width: 200px;
		padding: 0.5rem;
	}
}

.product-card__title {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 1.1rem;
	text-transform: uppercase;
	line-height: 1.3;
	color: #000000;
	margin: 0 0 0.75rem 0;
	letter-spacing: 0.5px;

	@media (max-width: 768px) {
		font-size: 1rem;
	}

	@media (max-width: 480px) {
		font-size: 0.9rem;
		margin: 0 0 0.5rem 0;
	}
}

.product-card__description {
	font-family: "RF Dewi Condensed", sans-serif;
	font-size: 0.95rem;
	line-height: 1.4;
	color: #666666;
	margin: 0 0 1rem 0;
	text-transform: lowercase;

	@media (max-width: 768px) {
		font-size: 0.9rem;
	}

	@media (max-width: 480px) {
		font-size: 0.85rem;
		margin: 0 0 0.75rem 0;
	}
}

// Стили для автокомплита категорий
.product-card__category {
	position: relative;

	@media (max-width: 480px) {
		margin-top: 0.5rem;
	}
}

.category-label {
	display: block;
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 0.8rem;
	text-transform: uppercase;
	color: #000000;
	margin-bottom: 0.5rem;
	letter-spacing: 0.5px;

	@media (max-width: 480px) {
		font-size: 0.75rem;
		margin-bottom: 0.25rem;
	}
}

.category-input {
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #000000;
	background: #ffffff;
	font-family: "RF Dewi Condensed", sans-serif;
	font-size: 0.9rem;
	color: #000000;

	&:focus {
		outline: none;
		border-color: #333333;
	}

	@media (max-width: 480px) {
		padding: 0.4rem;
		font-size: 0.85rem;
	}
}

.category-dropdown {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background: #ffffff;
	border: 1px solid #000000;
	border-top: none;
	max-height: 200px;
	overflow-y: auto;
	z-index: 100;

	@media (max-width: 480px) {
		max-height: 150px;
	}
}

.category-option {
	padding: 0.5rem;
	cursor: pointer;
	border-bottom: 1px solid #e0e0e0;
	display: flex;
	justify-content: space-between;
	align-items: center;

	&:hover {
		background: #f5f5f5;
	}

	&:last-child {
		border-bottom: none;
	}

	@media (max-width: 480px) {
		padding: 0.4rem;
		flex-direction: column;
		align-items: flex-start;
	}
}

.category-code {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 0.8rem;
	color: #000000;
	text-transform: uppercase;

	@media (max-width: 480px) {
		font-size: 0.75rem;
	}
}

.category-name {
	font-family: "RF Dewi Condensed", sans-serif;
	font-size: 0.85rem;
	color: #666666;

	@media (max-width: 480px) {
		font-size: 0.8rem;
	}
}
</style> 