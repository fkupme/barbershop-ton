import { ColumnType } from 'kysely';

export interface Database {
	admins: AdminTable;
	products: ProductTable;
	services: ServiceTable;
	hero_images: HeroImageTable;
	marquee_images: MarqueeImageTable;
}

export interface AdminTable {
	id: ColumnType<number, never, never>;
	username: string;
	password: string;
	email: string;
	role: 'admin' | 'super_admin';
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, string | undefined>;
}

export interface ProductTable {
	id: ColumnType<number, never, never>;
	title: string;
	description: string;
	image_url: string | null;
	category: string;
	category_name: string;
	tags: string; // JSON array as string
	price: number | null;
	is_active: boolean;
	sort_order: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, string | undefined>;
}

export interface ServiceTable {
	id: ColumnType<number, never, never>;
	title: string;
	description: string;
	price: number;
	duration: number | null;
	category: string;
	category_name: string;
	tags: string; // JSON array as string
	is_active: boolean;
	sort_order: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, string | undefined>;
}

export interface HeroImageTable {
	id: ColumnType<number, never, never>;
	image_url: string;
	alt_text: string | null;
	is_active: boolean;
	sort_order: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, string | undefined>;
}

export interface MarqueeImageTable {
	id: ColumnType<number, never, never>;
	image_url: string;
	alt_text: string | null;
	is_active: boolean;
	sort_order: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, string | undefined>;
}
