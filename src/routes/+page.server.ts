import { drizzle } from 'drizzle-orm/better-sqlite3';
//@ts-ignore-next-line
import Database from 'better-sqlite3';
import type { PageServerLoad } from './$types';
import { rooms } from '$lib/db/schema';

export const load: PageServerLoad = async () => {
	const sqlite = new Database('sqlite.db');
	const db = drizzle(sqlite);
	return {
		rooms: db.select().from(rooms).all()
	};
};
