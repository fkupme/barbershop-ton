export default defineEventHandler(async event => {
	// Удаляем auth cookie
	deleteCookie(event, 'auth-token');

	return {
		success: true,
		message: 'Вы успешно вышли из системы',
	};
});
