import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { rooms } from '$lib/db/schema';
//@ts-ignore-next-line
import Database from 'better-sqlite3';

export const actions = {
	default: async (event) => {
		const sqlite = new Database('sqlite.db');
		const db = drizzle(sqlite);

		const data = await event.request.formData();
		const name = String(data.get('name'));
		const description = String(data.get('description'));

		await db.insert(rooms).values({ name, description }).run();

		return redirect(301, '/');
	}
} satisfies Actions;
