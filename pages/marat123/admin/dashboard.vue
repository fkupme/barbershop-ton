<template>
	<q-layout view="hHh lpR fFf">
		<!-- Админ хедер -->
		<q-header class="admin-header bg-white text-black" bordered>
			<q-toolbar class="q-mx-auto q-px-md" style="max-width: 1400px">
				<q-toolbar-title>
					<div class="admin-logo">
						<span class="admin-title">АДМИН ПАНЕЛЬ</span>
						<span class="admin-subtitle">TON MOSCOW</span>
					</div>
				</q-toolbar-title>

				<UIAdminButton
					label="ВЫЙТИ"
					variant="secondary"
					@click="handleLogout"
				/>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<q-page class="admin-dashboard q-pa-lg">
				<!-- Статистика -->
				<div class="dashboard-stats q-mb-xl">
					<h1 class="dashboard-title q-mb-lg">УПРАВЛЕНИЕ КОНТЕНТОМ</h1>

					<div class="stats-grid">
						<UIBaseCard flat class="stat-card">
							<div class="stat-content">
								<div class="stat-number">
									{{ productsAdminStore.totalProducts }}
								</div>
								<div class="stat-label">ТОВАРОВ</div>
							</div>
						</UIBaseCard>

						<UIBaseCard flat class="stat-card">
							<div class="stat-content">
								<div class="stat-number">
									{{ servicesAdminStore.totalServices }}
								</div>
								<div class="stat-label">УСЛУГ</div>
							</div>
						</UIBaseCard>

						<UIBaseCard flat class="stat-card">
							<div class="stat-content">
								<div class="stat-number">{{ heroAdminStore.totalImages }}</div>
								<div class="stat-label">ФОТО 1 секции</div>
							</div>
						</UIBaseCard>

						<UIBaseCard flat class="stat-card">
							<div class="stat-content">
								<div class="stat-number">
									{{ marqueeAdminStore.totalImages }}
								</div>
								<div class="stat-label">ФОТО 2 секции</div>
							</div>
						</UIBaseCard>
					</div>
				</div>

				<!-- Табы для переключения между секциями -->
				<q-tabs
					v-model="activeTab"
					class="admin-tabs q-mb-lg"
					align="left"
					indicator-color="black"
				>
					<q-tab name="products" label="ТОВАРЫ" />
					<q-tab name="services" label="УСЛУГИ" />
					<q-tab name="hero" label="галерея 1 секции" />
					<q-tab name="marquee" label="галерея 2 секции" />
				</q-tabs>

				<!-- Контент табов -->
				<q-tab-panels v-model="activeTab" animated>
					<!-- Товары -->
					<q-tab-panel name="products" class="q-pa-none">
						<div class="section-header q-mb-lg">
							<h2 class="section-title">УПРАВЛЕНИЕ ТОВАРАМИ</h2>
							<UIAdminButton
								label="ДОБАВИТЬ ТОВАР"
								variant="primary"
								@click="openForm('product')"
							/>
						</div>

						<div
							class="products-grid"
							v-if="productsAdminStore.products.length"
						>
							<AdminProductCard
								v-for="product in productsAdminStore.products"
								:key="product.id"
								:product="product"
								@edit="editItem('product', product)"
								@delete="deleteProduct"
								@toggle="toggleProduct"
							/>
						</div>

						<div v-else class="empty-state">
							<p>Товары не найдены. Добавьте первый товар!</p>
						</div>
					</q-tab-panel>

					<!-- Услуги -->
					<q-tab-panel name="services" class="q-pa-none">
						<div class="section-header q-mb-lg">
							<h2 class="section-title">УПРАВЛЕНИЕ УСЛУГАМИ</h2>
							<UIAdminButton
								label="ДОБАВИТЬ УСЛУГУ"
								variant="primary"
								@click="openForm('service')"
							/>
						</div>

						<div
							class="services-grid"
							v-if="servicesAdminStore.services.length"
						>
							<AdminServiceCard
								v-for="service in servicesAdminStore.services"
								:key="service.id"
								:service="service"
								@edit="editItem('service', service)"
								@delete="deleteService"
								@toggle="toggleService"
							/>
						</div>

						<div v-else class="empty-state">
							<p>Услуги не найдены. Добавьте первую услугу!</p>
						</div>
					</q-tab-panel>

					<!-- Фото героя -->
					<q-tab-panel name="hero" class="q-pa-none">
						<div class="section-header q-mb-lg">
							<h2 class="section-title">ФОТОГРАФИИ ГЕРОЯ</h2>
							<UIAdminButton
								label="ДОБАВИТЬ ФОТО"
								variant="primary"
								@click="openForm('hero-image')"
							/>
						</div>

						<div class="images-grid" v-if="heroAdminStore.images.length">
							<AdminImageCard
								v-for="image in heroAdminStore.images"
								:key="image.id"
								:image="image"
								@edit="editItem('hero-image', image)"
								@delete="deleteHeroImage"
								@toggle="toggleHeroImage"
							/>
						</div>

						<div v-else class="empty-state">
							<p>Изображения не найдены. Добавьте первое изображение!</p>
						</div>
					</q-tab-panel>

					<!-- Фото marquee -->
					<q-tab-panel name="marquee" class="q-pa-none">
						<div class="section-header q-mb-lg">
							<h2 class="section-title">ФОТОГРАФИИ MARQUEE</h2>
							<UIAdminButton
								label="ДОБАВИТЬ ФОТО"
								variant="primary"
								@click="openForm('marquee-image')"
							/>
						</div>

						<div class="images-grid" v-if="marqueeAdminStore.images.length">
							<AdminImageCard
								v-for="image in marqueeAdminStore.images"
								:key="image.id"
								:image="image"
								@edit="editItem('marquee-image', image)"
								@delete="deleteMarqueeImage"
								@toggle="toggleMarqueeImage"
							/>
						</div>

						<div v-else class="empty-state">
							<p>Изображения не найдены. Добавьте первое изображение!</p>
						</div>
					</q-tab-panel>
				</q-tab-panels>

				<!-- Универсальная форма -->
				<AdminUniversalForm
					v-model="showForm"
					:type="formType"
					:initial-data="editingItem"
					@submit="handleFormSubmit"
					@close="closeForm"
				/>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script setup>
// Защита роута
definePageMeta({
	layout: false,
	middleware: "admin-auth",
});

// Стораы
const productsAdminStore = useProductsAdminStore();
const servicesAdminStore = useServicesAdminStore();
const heroAdminStore = useHeroAdminStore();
const marqueeAdminStore = useMarqueeAdminStore();

// Состояние
const activeTab = ref("products");
const showForm = ref(false);
const formType = ref("product");
const editingItem = ref({});

// Методы для работы с формой
const openForm = (type) => {
	formType.value = type;
	editingItem.value = {};
	showForm.value = true;
};

const editItem = (type, item) => {
	formType.value = type;
	editingItem.value = { ...item };
	showForm.value = true;
};

const closeForm = () => {
	showForm.value = false;
	formType.value = "product";
	editingItem.value = {};
};

// Обработчик отправки формы
const handleFormSubmit = async ({ type, data, isEdit }) => {
	try {
		let result;

		switch (type) {
			case "product":
				if (isEdit) {
					result = await productsAdminStore.updateProduct(data.id, data);
				} else {
					result = await productsAdminStore.createProduct(data);
				}
				break;

			case "service":
				if (isEdit) {
					result = await servicesAdminStore.updateService(data.id, data);
				} else {
					result = await servicesAdminStore.createService(data);
				}
				break;

			case "hero-image":
				if (isEdit) {
					result = await heroAdminStore.updateImage(data.id, data);
				} else {
					result = await heroAdminStore.createImage(data);
				}
				break;

			case "marquee-image":
				if (isEdit) {
					result = await marqueeAdminStore.updateImage(data.id, data);
				} else {
					result = await marqueeAdminStore.createImage(data);
				}
				break;

			default:
				throw new Error("Неизвестный тип формы");
		}

		// Закрываем форму при успехе
		closeForm();

		// Показываем уведомление
		alert(isEdit ? "Успешно обновлено!" : "Успешно создано!");
	} catch (error) {
		console.error("Ошибка сохранения:", error);
		alert(error.message || "Ошибка при сохранении");
	}
};

// Методы удаления и переключения статуса
const handleLogout = async () => {
	try {
		await $fetch("/api/auth/logout", {
			method: "POST",
		});

		await navigateTo("/marat123/admin/login");
	} catch (error) {
		console.error("Ошибка выхода:", error);
	}
};

const deleteProduct = async (product) => {
	if (confirm(`Удалить товар "${product.title}"?`)) {
		try {
			await productsAdminStore.deleteProduct(product.id);
			alert("Товар удален!");
		} catch (error) {
			alert("Ошибка удаления товара");
		}
	}
};

const toggleProduct = async (product) => {
	try {
		await productsAdminStore.toggleProductStatus(product.id);
	} catch (error) {
		alert("Ошибка изменения статуса товара");
	}
};

const deleteService = async (service) => {
	if (confirm(`Удалить услугу "${service.title}"?`)) {
		try {
			await servicesAdminStore.deleteService(service.id);
			alert("Услуга удалена!");
		} catch (error) {
			alert("Ошибка удаления услуги");
		}
	}
};

const toggleService = async (service) => {
	try {
		await servicesAdminStore.toggleServiceStatus(service.id);
	} catch (error) {
		alert("Ошибка изменения статуса услуги");
	}
};

const deleteHeroImage = async (image) => {
	if (confirm(`Удалить изображение?`)) {
		try {
			await heroAdminStore.deleteImage(image.id);
			alert("Изображение удалено!");
		} catch (error) {
			alert("Ошибка удаления изображения");
		}
	}
};

const toggleHeroImage = async (image) => {
	try {
		await heroAdminStore.toggleImageStatus(image.id);
	} catch (error) {
		alert("Ошибка изменения статуса изображения");
	}
};

const deleteMarqueeImage = async (image) => {
	if (confirm(`Удалить изображение?`)) {
		try {
			await marqueeAdminStore.deleteImage(image.id);
			alert("Изображение удалено!");
		} catch (error) {
			alert("Ошибка удаления изображения");
		}
	}
};

const toggleMarqueeImage = async (image) => {
	try {
		await marqueeAdminStore.toggleImageStatus(image.id);
	} catch (error) {
		alert("Ошибка изменения статуса изображения");
	}
};

// Загружаем данные при монтировании
onMounted(async () => {
	await Promise.all([
		productsAdminStore.fetchProducts(),
		servicesAdminStore.fetchServices(),
		heroAdminStore.fetchImages(),
		marqueeAdminStore.fetchImages(),
	]);
});
</script>

<style lang="scss" scoped>
.admin-header {
	border-bottom: 2px solid #000000;

	.admin-logo {
		display: flex;
		flex-direction: column;

		.admin-title {
			font-family: "RF Dewi Extended", sans-serif;
			font-weight: 700;
			font-size: 1.2rem;
			text-transform: uppercase;
			line-height: 1;
			color: #000000;
			letter-spacing: 0.1em;

			@media (max-width: 768px) {
				font-size: 1rem;
			}

			@media (max-width: 480px) {
				font-size: 0.9rem;
			}
		}

		.admin-subtitle {
			font-family: "RF Dewi Condensed", sans-serif;
			font-weight: 600;
			font-size: 0.8rem;
			text-transform: uppercase;
			color: #666666;
			letter-spacing: 0.05em;

			@media (max-width: 480px) {
				font-size: 0.7rem;
			}
		}

		@media (max-width: 480px) {
			gap: 2px;
		}
	}
}

.admin-dashboard {
	min-height: calc(100vh - 70px);
	background: #f8f8f8;

	@media (max-width: 768px) {
		padding: 1rem;
	}

	@media (max-width: 480px) {
		padding: 0.5rem;
		min-height: calc(100vh - 60px);
	}
}

.dashboard-title {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 2.5rem;
	text-transform: uppercase;
	color: #000000;
	margin: 0;
	letter-spacing: 0.1em;

	@media (max-width: 768px) {
		font-size: 2rem;
	}

	@media (max-width: 480px) {
		font-size: 1.5rem;
	}
}

.stats-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1.5rem;

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	}

	@media (max-width: 480px) {
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}
}

.stat-card {
	text-align: center;
	padding: 1.5rem;

	.stat-content {
		.stat-number {
			font-family: "RF Dewi Extended", sans-serif;
			font-weight: 700;
			font-size: 2.5rem;
			color: #000000;
			line-height: 1;
			margin-bottom: 0.5rem;

			@media (max-width: 768px) {
				font-size: 2rem;
			}

			@media (max-width: 480px) {
				font-size: 1.5rem;
				margin-bottom: 0.25rem;
			}
		}

		.stat-label {
			font-family: "RF Dewi Condensed", sans-serif;
			font-weight: 600;
			font-size: 1rem;
			text-transform: uppercase;
			color: #666666;
			letter-spacing: 0.1em;

			@media (max-width: 768px) {
				font-size: 0.9rem;
			}

			@media (max-width: 480px) {
				font-size: 0.8rem;
				letter-spacing: 0.05em;
			}
		}
	}

	@media (max-width: 768px) {
		padding: 1rem;
	}

	@media (max-width: 480px) {
		padding: 0.75rem;
	}
}

.admin-tabs {
	border-bottom: 2px solid #000000;

	:deep(.q-tab) {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #666666;

		&.q-tab--active {
			color: #000000;
		}

		@media (max-width: 768px) {
			font-size: 0.9rem;
			min-width: auto;
			padding: 0 12px;
		}

		@media (max-width: 480px) {
			font-size: 0.8rem;
			padding: 0 8px;
			letter-spacing: 0.05em;
		}
	}

	:deep(.q-tabs__indicator) {
		background: #000000;
		height: 3px;
	}

	@media (max-width: 480px) {
		:deep(.q-tabs__content) {
			flex-wrap: wrap;
		}
	}
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	@media (max-width: 480px) {
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.section-title {
		font-family: "RF Dewi Extended", sans-serif;
		font-weight: 700;
		font-size: 1.5rem;
		text-transform: uppercase;
		color: #000000;
		margin: 0;
		letter-spacing: 0.1em;

		@media (max-width: 768px) {
			font-size: 1.25rem;
		}

		@media (max-width: 480px) {
			font-size: 1.1rem;
		}
	}
}

.products-grid,
.services-grid,
.images-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1.5rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (max-width: 480px) {
		gap: 0.75rem;
	}
}

.empty-state {
	text-align: center;
	padding: 3rem 2rem;
	background: #ffffff;
	border: 2px solid #000000;
	border-radius: 0;

	p {
		font-family: "RF Dewi Condensed", sans-serif;
		font-weight: 600;
		font-size: 1.1rem;
		color: #666666;
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;

		@media (max-width: 768px) {
			font-size: 1rem;
		}

		@media (max-width: 480px) {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 768px) {
		padding: 2rem 1rem;
	}

	@media (max-width: 480px) {
		padding: 1.5rem 0.75rem;
	}
}

// Дополнительные адаптивные стили
:deep(.q-toolbar) {
	@media (max-width: 768px) {
		padding: 0 1rem;
	}

	@media (max-width: 480px) {
		padding: 0 0.5rem;
		min-height: 50px;
	}
}

:deep(.q-page) {
	@media (max-width: 480px) {
		padding: 0.5rem;
	}
}

:deep(.q-tab-panels) {
	@media (max-width: 480px) {
		.q-tab-panel {
			padding: 0;
		}
	}
}

// Стили для кнопок в мобильной версии
:deep(.admin-button) {
	@media (max-width: 768px) {
		width: 40%;
	}

	@media (max-width: 480px) {
		font-size: 0.8rem;
		padding: 0.6rem 1rem;
	}
}
</style> 