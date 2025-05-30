import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '~/server/database/db';

export default defineEventHandler(async event => {
	const { username, password } = await readBody(event);

	if (!username || !password) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Логин и пароль обязательны',
		});
	}

	try {
		// Ищем админа в БД
		const admin = await db
			.selectFrom('admins')
			.where('username', '=', username)
			.selectAll()
			.executeTakeFirst();

		if (!admin) {
			throw createError({
				statusCode: 401,
				statusMessage: 'Неверный логин или пароль',
			});
		}

		// Проверяем пароль
		const passwordValid = await bcrypt.compare(password, admin.password);

		if (!passwordValid) {
			throw createError({
				statusCode: 401,
				statusMessage: 'Неверный логин или пароль',
			});
		}

		// Создаем JWT токен
		const token = jwt.sign(
			{
				id: admin.id,
				username: admin.username,
				role: admin.role,
			},
			process.env.JWT_SECRET || 'default-secret-change-in-production',
			{ expiresIn: '7d' }
		);

		// Устанавливаем httpOnly cookie
		setCookie(event, 'auth-token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7, // 7 дней
		});

		return {
			success: true,
			user: {
				id: admin.id,
				username: admin.username,
				email: admin.email,
				role: admin.role,
			},
		};
	} catch (error) {
		console.error('Ошибка авторизации:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Внутренняя ошибка сервера',
		});
	}
});
