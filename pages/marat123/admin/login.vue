<template>
	<q-layout view="hHh lpR fFf">
		<q-page-container>
			<q-page class="login-page flex flex-center">
				<UIBaseCard class="q-pa-xl q-m-xl" flat style="">
					<q-card-section class="text-center q-pb-lg">
						<div class="login-title q-mb-md">АДМИН ПАНЕЛЬ</div>
						<div class="login-subtitle">TON MOSCOW BARBERSHOP</div>
					</q-card-section>

					<q-card-section>
						<q-form @submit="handleLogin" class="q-gutter-lg">
							<UIInputField
								v-model="form.username"
								label="ЛОГИН"
								autocomplete="username"
								:loading="loading"
								:disable="loading"
								required
							/>

							<UIInputField
								v-model="form.password"
								label="ПАРОЛЬ"
								type="password"
								autocomplete="current-password"
								:loading="loading"
								:disable="loading"
								required
							/>

							<div class="q-mt-xl">
								<UIAdminButton
									type="submit"
									label="ВОЙТИ В СИСТЕМУ"
									variant="primary"
									custom-class="full-width"
									:loading="loading"
									:disabled="loading"
								/>
							</div>
						</q-form>
					</q-card-section>

					<!-- Тестовые данные для разработки -->
					<q-card-section class="text-center q-pt-lg">
						<div class="test-credentials">
							<div class="test-title">ТЕСТОВЫЙ ДОСТУП:</div>
							<div class="test-data">admin / admin123</div>
						</div>
					</q-card-section>
				</UIBaseCard>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script setup>
definePageMeta({
	layout: false,
});

const loading = ref(false);
const form = ref({
	username: "",
	password: "",
});

const handleLogin = async () => {
	loading.value = true;

	try {
		const response = await $fetch("/api/auth/login", {
			method: "POST",
			body: form.value,
		});

		if (response.success) {
			await navigateTo("/marat123/admin/dashboard");
		}
	} catch (error) {
		console.error("Ошибка авторизации:", error);

		// Показываем уведомление об ошибке
		const message =
			error.data?.statusMessage || error.statusMessage || "Ошибка авторизации";

		// Простое уведомление в стиле сайта
		alert(message);
	} finally {
		loading.value = false;
	}
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables" as *;
@use "~/assets/styles/mixins" as *;

.login-page {
	min-height: 100vh;
	position: relative;
	padding-inline: 16px;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0.02) 0%,
			rgba(255, 255, 255, 0.05) 100%
		);
		pointer-events: none;
	}

	@media (max-width: 768px) {
		padding-inline: 8px;
	}
}

.login-card {
	background: #ffffff;
	border: 2px solid #000000;
	border-radius: 0;
	box-shadow: 8px 8px 0px #000000;
	position: relative;

	// Принудительно убираем border-radius у полей
	:deep(.q-field--outlined .q-field__control) {
		padding: 0 12px;
		border-radius: 0 !important;
	}

	:deep(.q-field__control) {
		border-radius: 0 !important;
	}

	:deep(.q-field__native) {
		border-radius: 0 !important;
	}

	&::before {
		content: "";
		position: absolute;
		top: -4px;
		left: -4px;
		right: -4px;
		bottom: -4px;
		background: #000000;
		z-index: -1;
	}

	@media (max-width: 768px) {
		box-shadow: 4px 4px 0px #000000;

		&::before {
			top: -2px;
			left: -2px;
			right: -2px;
			bottom: -2px;
		}
	}

	@media (max-width: 480px) {
		box-shadow: 2px 2px 0px #000000;

		&::before {
			top: -1px;
			left: -1px;
			right: -1px;
			bottom: -1px;
		}
	}
}

.login-title {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	font-size: 2rem;
	text-transform: uppercase;
	line-height: 1.2;
	color: #000000;
	letter-spacing: 0.1em;

	@media (max-width: 768px) {
		font-size: 1.75rem;
	}

	@media (max-width: 480px) {
		font-size: 1.5rem;
	}
}

.login-subtitle {
	font-family: "RF Dewi Condensed", sans-serif;
	font-weight: 600;
	font-size: 1rem;
	text-transform: uppercase;
	color: #333333;
	letter-spacing: 0.05em;

	@media (max-width: 768px) {
		font-size: 0.9rem;
	}

	@media (max-width: 480px) {
		font-size: 0.85rem;
	}
}

.login-btn {
	font-family: "RF Dewi Extended", sans-serif;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.1em;

	:deep(.q-btn) {
		padding: 16px 24px;
		font-size: 1rem;

		@media (max-width: 768px) {
			padding: 14px 20px;
			font-size: 0.9rem;
		}

		@media (max-width: 480px) {
			padding: 12px 16px;
			font-size: 0.85rem;
		}
	}
}

.test-credentials {
	padding: 16px;
	background: #f8f8f8;
	border: 1px solid #e0e0e0;

	.test-title {
		font-family: "RF Dewi Condensed", sans-serif;
		font-weight: 600;
		font-size: 0.875rem;
		text-transform: uppercase;
		color: #333333;
		margin-bottom: 8px;
		letter-spacing: 0.05em;

		@media (max-width: 480px) {
			font-size: 0.8rem;
			margin-bottom: 6px;
		}
	}

	.test-data {
		font-family: "RF Dewi", sans-serif;
		font-weight: 500;
		font-size: 1rem;
		color: #000000;
		letter-spacing: 0.02em;

		@media (max-width: 480px) {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 768px) {
		padding: 12px;
	}

	@media (max-width: 480px) {
		padding: 8px;
	}
}

// Дополнительные стили для input полей
:deep(.q-field) {
	.q-field__control {
		border-radius: 0 !important;

		&:before {
			border-radius: 0 !important;
		}

		&:after {
			border-radius: 0 !important;
		}
	}

	.q-field__native {
		border-radius: 0 !important;
	}

	input {
		border-radius: 0 !important;
	}
}

// Адаптив для карточки
:deep(.q-card) {
	@media (max-width: 768px) {
		margin: 1rem;
		padding: 1.5rem;
	}

	@media (max-width: 480px) {
		margin: 0.5rem;
		padding: 1rem;
	}
}

// Убираем все переменные
:root {
	--color-white: #ffffff;
	--color-black: #000000;
	--color-dark: #333333;
	--color-light: #f8f8f8;
	--color-border: #e0e0e0;
}
</style> 