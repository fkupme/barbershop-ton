import fs from 'fs';
import path from 'path';
import { runMigrations } from '../database/migrations';

export default defineNitroPlugin(async () => {
	console.log('🔧 Инициализация базы данных...');

	// Создаем папку .data если её нет
	const dataDir = path.join(process.cwd(), '.data');
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true });
		console.log('📁 Создана папка .data');
	}

	try {
		await runMigrations();
	} catch (error) {
		console.error('❌ Ошибка при инициализации БД:', error);
	}
});
