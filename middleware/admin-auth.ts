export default defineNuxtRouteMiddleware(async (to, from) => {
	try {
		// Проверяем авторизацию через API
		const response = await $fetch('/api/auth/verify', {
			method: 'GET',
		});

		if (!response || !response.success) {
			throw new Error('Не авторизован');
		}

		// Проверяем роль пользователя
		if (
			!response.user ||
			(response.user.role !== 'admin' && response.user.role !== 'super_admin')
		) {
			throw new Error('Недостаточно прав');
		}
	} catch (error) {
		// Перенаправляем на страницу логина
		return navigateTo('/marat123/admin/login');
	}
});
