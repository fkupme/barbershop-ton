<template>
	<q-dialog v-model="isOpen" persistent>
		<UIBaseCard
			class="universal-form"
			style="min-width: 320px; max-width: 800px; width: 90vw"
		>
			<q-card-section class="universal-form__header">
				<div class="form-title">
					{{
						editMode
							? `РЕДАКТИРОВАТЬ ${formConfig.title}`
							: `ДОБАВИТЬ ${formConfig.title}`
					}}
				</div>
				<q-btn
					flat
					round
					dense
					icon="close"
					@click="closeForm"
					class="close-btn"
				/>
			</q-card-section>

			<q-card-section class="universal-form__body">
				<q-form @submit="handleSubmit" class="form-grid">
					<!-- Динамически генерируемые поля -->
					<template v-for="field in formConfig.fields" :key="field.key">
						<!-- Текстовое поле -->
						<UIInputField
							v-if="
								field.type === 'text' &&
								field.key !== 'category' &&
								field.key !== 'category_name'
							"
							v-model="formData[field.key]"
							:label="field.label"
							:placeholder="field.placeholder"
							:required="field.required"
							:disable="loading"
							class="form-field"
						/>

						<!-- Автокомплит категории -->
						<div
							v-else-if="field.key === 'category'"
							class="form-field form-field--full category-autocomplete"
						>
							<label class="category-label">КАТЕГОРИЯ</label>
							<div class="category-inputs">
								<div class="category-code-input">
									<UIInputField
										v-model="categoryCode"
										label="КОД КАТЕГОРИИ"
										placeholder="hair, beard, style"
										:disable="loading"
										@input="handleCategoryCodeChange"
										@focus="showCategoryDropdown = true"
										class="category-field"
									/>
									<div
										v-if="showCategoryDropdown && filteredCategories.length"
										class="category-dropdown"
									>
										<div
											v-for="category in filteredCategories"
											:key="category.code"
											@mousedown="selectCategory(category)"
											class="category-option"
										>
											<span class="category-option-code">{{
												category.code
											}}</span>
											<span class="category-option-name">{{
												category.name
											}}</span>
										</div>
									</div>
								</div>
								<div class="category-name-input">
									<UIInputField
										v-model="categoryName"
										label="НАЗВАНИЕ КАТЕГОРИИ"
										placeholder="Уход за волосами"
										:disable="loading"
										@input="handleCategoryNameChange"
										class="category-field"
									/>
								</div>
							</div>
							<div class="category-actions">
								<button
									type="button"
									@click="addNewCategory"
									class="add-category-btn"
									:disabled="!categoryCode || !categoryName"
								>
									+ ДОБАВИТЬ НОВУЮ КАТЕГОРИЮ
								</button>
							</div>
						</div>

						<!-- Пропускаем поле category_name так как оно включено в автокомплит -->
						<template v-else-if="field.key === 'category_name'">
							<!-- Поле обрабатывается в блоке category -->
						</template>

						<!-- Многострочный текст -->
						<UIInputField
							v-else-if="field.type === 'textarea'"
							v-model="formData[field.key]"
							:label="field.label"
							:placeholder="field.placeholder"
							:required="field.required"
							:disable="loading"
							type="textarea"
							:rows="field.rows || 3"
							class="form-field form-field--full"
						/>

						<!-- Числовое поле -->
						<UIInputField
							v-else-if="field.type === 'number'"
							v-model.number="formData[field.key]"
							:label="field.label"
							:placeholder="field.placeholder"
							:required="field.required"
							:disable="loading"
							type="number"
							:min="field.min || 0"
							:max="field.max"
							:step="field.step || 1"
							class="form-field"
						/>

						<!-- Селект -->
						<div v-else-if="field.type === 'select'" class="form-field">
							<q-select
								v-model="formData[field.key]"
								:options="field.options"
								:label="field.label"
								:required="field.required"
								:disable="loading"
								outlined
								emit-value
								map-options
								class="custom-select"
							/>
						</div>

						<!-- URL поле с превью -->
						<div
							v-else-if="field.type === 'image-url'"
							class="form-field form-field--full"
						>
							<UIInputField
								v-model="formData[field.key]"
								:label="field.label"
								:placeholder="field.placeholder"
								:required="field.required"
								:disable="loading"
								class="url-input"
							/>
							<div v-if="formData[field.key]" class="image-preview">
								<img
									:src="formData[field.key]"
									:alt="formData.alt_text || 'Превью'"
									@error="handleImageError"
									class="preview-img"
								/>
							</div>
						</div>

						<!-- Теги (массив строк) -->
						<div
							v-else-if="field.type === 'tags'"
							class="form-field form-field--full"
						>
							<q-select
								v-model="formData[field.key]"
								:label="field.label"
								:options="tagOptions"
								multiple
								use-chips
								use-input
								hide-dropdown-icon
								new-value-mode="add-unique"
								outlined
								:disable="loading"
								@new-value="createTag"
								class="custom-select"
							/>
						</div>

						<!-- Переключатель активности -->
						<div
							v-else-if="field.type === 'toggle'"
							class="form-field toggle-field"
						>
							<q-toggle
								v-model="formData[field.key]"
								:label="field.label"
								:disable="loading"
								class="custom-toggle"
							/>
						</div>
					</template>
				</q-form>
			</q-card-section>

			<q-card-actions class="universal-form__actions" align="right">
				<UIAdminButton
					label="ОТМЕНА"
					variant="secondary"
					@click="closeForm"
					:disabled="loading"
				/>
				<UIAdminButton
					:label="editMode ? 'ОБНОВИТЬ' : 'СОЗДАТЬ'"
					variant="primary"
					@click="handleSubmit"
					:loading="loading"
					:disabled="loading"
				/>
			</q-card-actions>
		</UIBaseCard>
	</q-dialog>
</template>

<script setup>
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
		required: true,
		validator: (value) =>
			["product", "service", "hero-image", "marquee-image"].includes(value),
	},
	initialData: {
		type: Object,
		default: () => ({}),
	},
});

const emit = defineEmits(["update:modelValue", "submit", "close"]);

// Состояние
const loading = ref(false);
const formData = ref({});
const tagOptions = ref([]);

// Состояние для автокомплита категорий
const categories = ref([]);
const filteredCategories = ref([]);
const showCategoryDropdown = ref(false);
const categoryCode = ref("");
const categoryName = ref("");

// Вычисляемые свойства
const isOpen = computed({
	get: () => props.modelValue,
	set: (value) => emit("update:modelValue", value),
});

const editMode = computed(() => {
	return Object.keys(props.initialData).length > 0 && props.initialData.id;
});

// Конфигурации форм для разных типов (убираем отдельные поля категории)
const formConfigs = {
	product: {
		title: "ТОВАР",
		fields: [
			{
				key: "title",
				type: "text",
				label: "НАЗВАНИЕ",
				placeholder: "Введите название товара",
				required: true,
			},
			{
				key: "description",
				type: "textarea",
				label: "ОПИСАНИЕ",
				placeholder: "Описание товара",
				rows: 3,
			},
			{
				key: "image_url",
				type: "image-url",
				label: "URL ИЗОБРАЖЕНИЯ",
				placeholder: "https://example.com/image.jpg",
			},
			{
				key: "category",
				type: "category-autocomplete",
				label: "КАТЕГОРИЯ",
				required: true,
			},
			{
				key: "category_name",
				type: "hidden", // Скрываем, так как обрабатывается вместе с category
			},
			{
				key: "tags",
				type: "tags",
				label: "ТЕГИ",
			},
			{
				key: "sort_order",
				type: "number",
				label: "ПОРЯДОК СОРТИРОВКИ",
				placeholder: "0",
				min: 0,
			},
			{
				key: "is_active",
				type: "toggle",
				label: "АКТИВНЫЙ",
			},
		],
	},
	service: {
		title: "УСЛУГУ",
		fields: [
			{
				key: "title",
				type: "text",
				label: "НАЗВАНИЕ",
				placeholder: "Введите название услуги",
				required: true,
			},
			{
				key: "description",
				type: "textarea",
				label: "ОПИСАНИЕ",
				placeholder: "Описание услуги",
				rows: 3,
			},
			{
				key: "category",
				type: "category-autocomplete",
				label: "КАТЕГОРИЯ",
				required: true,
			},
			{
				key: "category_name",
				type: "hidden",
			},
			{
				key: "price",
				type: "number",
				label: "ЦЕНА (руб.)",
				placeholder: "1500",
				min: 0,
				required: true,
			},
			{
				key: "duration",
				type: "number",
				label: "ДЛИТЕЛЬНОСТЬ (мин.)",
				placeholder: "45",
				min: 5,
				max: 300,
				step: 5,
			},
			{
				key: "sort_order",
				type: "number",
				label: "ПОРЯДОК СОРТИРОВКИ",
				placeholder: "0",
				min: 0,
			},
			{
				key: "is_active",
				type: "toggle",
				label: "АКТИВНАЯ",
			},
		],
	},
	"hero-image": {
		title: "ФОТО ГЕРОЯ",
		fields: [
			{
				key: "image_url",
				type: "image-url",
				label: "URL ИЗОБРАЖЕНИЯ",
				placeholder: "https://example.com/image.jpg",
				required: true,
			},
			{
				key: "alt_text",
				type: "text",
				label: "ALT ТЕКСТ",
				placeholder: "Описание изображения для SEO",
			},
			{
				key: "sort_order",
				type: "number",
				label: "ПОРЯДОК СОРТИРОВКИ",
				placeholder: "0",
				min: 0,
			},
			{
				key: "is_active",
				type: "toggle",
				label: "АКТИВНОЕ",
			},
		],
	},
	"marquee-image": {
		title: "ФОТО MARQUEE",
		fields: [
			{
				key: "image_url",
				type: "image-url",
				label: "URL ИЗОБРАЖЕНИЯ",
				placeholder: "https://example.com/image.jpg",
				required: true,
			},
			{
				key: "alt_text",
				type: "text",
				label: "ALT ТЕКСТ",
				placeholder: "Описание изображения для SEO",
			},
			{
				key: "sort_order",
				type: "number",
				label: "ПОРЯДОК СОРТИРОВКИ",
				placeholder: "0",
				min: 0,
			},
			{
				key: "is_active",
				type: "toggle",
				label: "АКТИВНОЕ",
			},
		],
	},
};

const formConfig = computed(
	() => formConfigs[props.type] || formConfigs.product
);

// Методы для работы с категориями
const loadCategories = async () => {
	try {
		const response = await $fetch("/api/categories");
		if (response && response.success && response.data) {
			categories.value = response.data;
			filteredCategories.value = response.data;
		}
	} catch (error) {
		console.error("Ошибка загрузки категорий:", error);
		// Дефолтные категории при ошибке
		categories.value = [
			{ id: 1, code: "hair", name: "Уход за волосами" },
			{ id: 2, code: "beard", name: "Уход за бородой" },
			{ id: 3, code: "style", name: "Стрижки" },
			{ id: 4, code: "care", name: "Косметика" },
		];
		filteredCategories.value = categories.value;
	}
};

const filterCategories = (searchTerm) => {
	if (!searchTerm.trim()) {
		filteredCategories.value = categories.value;
		return;
	}

	const search = searchTerm.toLowerCase();
	filteredCategories.value = categories.value.filter(
		(category) =>
			category.code.toLowerCase().includes(search) ||
			category.name.toLowerCase().includes(search)
	);
};

const handleCategoryCodeChange = () => {
	// Синхронизируем с formData
	formData.value.category = categoryCode.value;

	// Ищем соответствующую категорию
	const foundCategory = categories.value.find(
		(cat) => cat.code === categoryCode.value
	);
	if (foundCategory) {
		categoryName.value = foundCategory.name;
		formData.value.category_name = foundCategory.name;
	}

	// Фильтруем категории для автокомплита
	filterCategories(categoryCode.value);
	showCategoryDropdown.value = true;
};

const handleCategoryNameChange = () => {
	// Синхронизируем с formData
	formData.value.category_name = categoryName.value;

	// Ищем соответствующую категорию
	const foundCategory = categories.value.find(
		(cat) => cat.name === categoryName.value
	);
	if (foundCategory) {
		categoryCode.value = foundCategory.code;
		formData.value.category = foundCategory.code;
	}
};

const selectCategory = (category) => {
	categoryCode.value = category.code;
	categoryName.value = category.name;
	formData.value.category = category.code;
	formData.value.category_name = category.name;
	showCategoryDropdown.value = false;
};

const addNewCategory = () => {
	if (categoryCode.value && categoryName.value) {
		const newCategory = {
			id: categories.value.length + 1,
			code: categoryCode.value,
			name: categoryName.value,
		};

		// Проверяем, что такой категории ещё нет
		const exists = categories.value.find(
			(cat) => cat.code === newCategory.code
		);
		if (!exists) {
			categories.value.push(newCategory);
			filteredCategories.value = categories.value;
		}

		// Устанавливаем в форму
		formData.value.category = categoryCode.value;
		formData.value.category_name = categoryName.value;
		showCategoryDropdown.value = false;
	}
};

// Методы
const initializeForm = () => {
	const defaultValues = {};

	// Устанавливаем значения по умолчанию
	formConfig.value.fields.forEach((field) => {
		if (field.type === "toggle") {
			defaultValues[field.key] = true;
		} else if (field.type === "number") {
			defaultValues[field.key] = 0;
		} else if (field.type === "tags") {
			defaultValues[field.key] = [];
		} else {
			defaultValues[field.key] = "";
		}
	});

	// Применяем начальные данные если есть
	formData.value = { ...defaultValues, ...props.initialData };

	// Синхронизируем категории
	categoryCode.value = formData.value.category || "";
	categoryName.value = formData.value.category_name || "";
};

const createTag = (val, done) => {
	if (val.length > 0) {
		if (!tagOptions.value.includes(val)) {
			tagOptions.value.push(val);
		}
		done(val, "add-unique");
	}
};

const handleImageError = (event) => {
	event.target.style.display = "none";
};

const handleSubmit = async () => {
	loading.value = true;

	try {
		// Синхронизируем категории перед отправкой
		formData.value.category = categoryCode.value;
		formData.value.category_name = categoryName.value;

		// Валидация обязательных полей
		const requiredFields = formConfig.value.fields.filter(
			(field) => field.required
		);
		for (const field of requiredFields) {
			if (field.key === "category" && !categoryCode.value) {
				throw new Error(`Поле "КАТЕГОРИЯ" обязательно для заполнения`);
			} else if (field.key !== "category" && !formData.value[field.key]) {
				throw new Error(`Поле "${field.label}" обязательно для заполнения`);
			}
		}

		emit("submit", {
			type: props.type,
			data: { ...formData.value },
			isEdit: editMode.value,
		});
	} catch (error) {
		alert(error.message);
	} finally {
		loading.value = false;
	}
};

const closeForm = () => {
	showCategoryDropdown.value = false;
	emit("close");
	emit("update:modelValue", false);
};

// Закрытие дропдауна при клике вне
const hideDropdown = () => {
	setTimeout(() => {
		showCategoryDropdown.value = false;
	}, 200);
};

// Watchers
watch(
	() => props.initialData,
	() => {
		initializeForm();
	},
	{ immediate: true, deep: true }
);

watch(
	() => props.type,
	() => {
		initializeForm();
	},
	{ immediate: true }
);

// Загружаем категории при монтировании
onMounted(() => {
	loadCategories();
});

// Закрываем дропдаун при потере фокуса
onMounted(() => {
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".category-autocomplete")) {
			showCategoryDropdown.value = false;
		}
	});
});
</script>

<style lang="scss" scoped>
.universal-form {
	:deep(.q-card) {
		border: 2px solid #000000;
		border-radius: 0;
		box-shadow: 8px 8px 0px #000000;

		@media (max-width: 768px) {
			box-shadow: 4px 4px 0px #000000;
		}

		@media (max-width: 480px) {
			box-shadow: 2px 2px 0px #000000;
		}
	}
}

.universal-form__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid #000000;
	padding: 1.5rem;

	.form-title {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 700;
		font-size: 1.25rem;
		text-transform: uppercase;
		color: #000000;
		letter-spacing: 0.1em;

		@media (max-width: 768px) {
			font-size: 1.1rem;
		}

		@media (max-width: 480px) {
			font-size: 1rem;
		}
	}

	.close-btn {
		background: #000000;
		color: #ffffff;
		border-radius: 0;

		&:hover {
			background: #333333;
		}
	}

	@media (max-width: 768px) {
		padding: 1rem;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
	}

	@media (max-width: 480px) {
		padding: 0.75rem;
		flex-direction: row;
		gap: 0.5rem;
	}
}

.universal-form__body {
	padding: 2rem;
	max-height: 70vh;
	overflow-y: auto;

	@media (max-width: 768px) {
		padding: 1.5rem;
		max-height: 60vh;
	}

	@media (max-width: 480px) {
		padding: 1rem;
		max-height: 50vh;
	}
}

.form-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1.5rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (max-width: 480px) {
		gap: 0.75rem;
	}
}

.form-field {
	&--full {
		grid-column: 1 / -1;
	}

	:deep(.q-field--outlined .q-field__control) {
		border-radius: 0;
		border: 2px solid #000000;

		&:hover {
			border-color: #333333;
		}
	}

	:deep(.q-field--focused .q-field__control) {
		border-color: #000000;
		box-shadow: 2px 2px 0px #000000;
	}
}

// Стили для автокомплита категорий
.category-autocomplete {
	position: relative;

	.category-label {
		display: block;
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 700;
		font-size: 0.9rem;
		text-transform: uppercase;
		color: #000000;
		margin-bottom: 1rem;
		letter-spacing: 0.1em;

		@media (max-width: 480px) {
			font-size: 0.8rem;
			margin-bottom: 0.75rem;
		}
	}

	.category-inputs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}
	}

	.category-code-input {
		position: relative;
	}

	.category-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: #ffffff;
		border: 2px solid #000000;
		border-top: none;
		max-height: 200px;
		overflow-y: auto;
		z-index: 1000;

		@media (max-width: 480px) {
			max-height: 150px;
		}
	}

	.category-option {
		padding: 0.75rem;
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

		.category-option-code {
			font-family: "RF Dewi Extended", sans-serif;
			font-weight: 700;
			font-size: 0.8rem;
			color: #000000;
			text-transform: uppercase;
		}

		.category-option-name {
			font-family: "RF Dewi Condensed", sans-serif;
			font-size: 0.85rem;
			color: #666666;
		}

		@media (max-width: 480px) {
			padding: 0.5rem;
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}
	}

	.category-actions {
		margin-top: 1rem;

		.add-category-btn {
			background: transparent;
			border: 2px solid #666666;
			color: #666666;
			padding: 0.5rem 1rem;
			font-family: "RF Dewi Extended", sans-serif;
			font-weight: 700;
			font-size: 0.8rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			cursor: pointer;
			transition: all 0.2s ease;

			&:hover:not(:disabled) {
				background: #666666;
				color: #ffffff;
			}

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}

			@media (max-width: 480px) {
				padding: 0.4rem 0.8rem;
				font-size: 0.75rem;
				width: 100%;
			}
		}

		@media (max-width: 480px) {
			margin-top: 0.75rem;
		}
	}
}

.toggle-field {
	display: flex;
	align-items: center;
	min-height: 56px;

	.custom-toggle {
		:deep(.q-toggle__inner) {
			color: #000000;
		}

		:deep(.q-toggle__track) {
			background: #f0f0f0;
			border: 2px solid #000000;
		}

		:deep(.q-toggle--truthy .q-toggle__track) {
			background: #000000;
		}

		:deep(.q-toggle__thumb) {
			background: #ffffff;
			border: 2px solid #000000;
		}
	}
}

.custom-select {
	:deep(.q-field--outlined .q-field__control) {
		border-radius: 0;
		border: 2px solid #000000;
	}

	:deep(.q-chip) {
		background: #000000;
		color: #ffffff;
		border-radius: 0;
	}
}

.image-preview {
	margin-top: 1rem;
	text-align: center;

	.preview-img {
		max-width: 200px;
		max-height: 150px;
		object-fit: cover;
		border: 2px solid #000000;
		box-shadow: 4px 4px 0px #000000;

		@media (max-width: 768px) {
			max-width: 150px;
			max-height: 120px;
			box-shadow: 2px 2px 0px #000000;
		}

		@media (max-width: 480px) {
			max-width: 120px;
			max-height: 100px;
		}
	}
}

.universal-form__actions {
	display: flex;
	gap: 1rem;
	padding: 1.5rem;
	border-top: 2px solid #000000;
	background: #ffffff;

	@media (max-width: 768px) {
		padding: 1rem;
		flex-direction: column;
	}

	@media (max-width: 480px) {
		padding: 0.75rem;
		gap: 0.75rem;
	}
}

// Адаптивные стили для кнопок
:deep(.admin-button) {
	@media (max-width: 768px) {
		width: 100%;
	}

	@media (max-width: 480px) {
		font-size: 0.8rem;
		padding: 0.6rem 1rem;
	}
}
</style> 