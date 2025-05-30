import type { H3Event } from 'h3';
import jwt from 'jsonwebtoken';

export interface AuthUser {
	id: number;
	username: string;
	role: 'admin' | 'super_admin';
}

export function verifyToken(token: string): AuthUser | null {
	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'default-secret-change-in-production'
		) as any;

		return {
			id: decoded.id,
			username: decoded.username,
			role: decoded.role,
		};
	} catch (error) {
		return null;
	}
}

export function requireAuth(event: H3Event): AuthUser {
	const token = getCookie(event, 'auth-token');

	if (!token) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Требуется авторизация',
		});
	}

	const user = verifyToken(token);

	if (!user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Недействительный токен',
		});
	}

	return user;
}

export function requireSuperAdmin(event: H3Event): AuthUser {
	const user = requireAuth(event);

	if (user.role !== 'super_admin') {
		throw createError({
			statusCode: 403,
			statusMessage: 'Недостаточно прав',
		});
	}

	return user;
}
