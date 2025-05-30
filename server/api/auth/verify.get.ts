import { verifyToken } from '~/server/utils/auth';

export default defineEventHandler(async event => {
	try {
		const token = getCookie(event, 'auth-token');

		if (!token) {
			return {
				success: false,
				message: 'Токен не найден',
			};
		}

		const user = verifyToken(token);

		if (!user) {
			return {
				success: false,
				message: 'Недействительный токен',
			};
		}

		return {
			success: true,
			user: {
				id: user.id,
				username: user.username,
				role: user.role,
			},
		};
	} catch (error) {
		console.error('Ошибка проверки токена:', error);
		return {
			success: false,
			message: 'Ошибка проверки авторизации',
		};
	}
});
