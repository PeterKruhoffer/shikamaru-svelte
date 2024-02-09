import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const rooms = sqliteTable('rooms', {
	id: integer('id').primaryKey(),
	name: text('name'),
	description: text('description'),
	people: text('people', { mode: 'json' }).$type<
		[{ id: number; name: string | null; roomId: number | null | undefined }]
	>()
});

export type Room = typeof rooms.$inferSelect;
export type InsertRoom = typeof rooms.$inferInsert;

export const tasks = sqliteTable('tasks', {
	id: integer('id').primaryKey(),
	name: text('name'),
	description: text('description'),
	deadline: text('deadline'),
	roomId: integer('room_id').references(() => rooms.id),
	assigneeId: integer('assignee_id').references(() => people.id)
});

export type Task = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;

export const people = sqliteTable('people', {
	id: integer('id').primaryKey(),
	name: text('name'),
	roomId: integer('room_id').references(() => rooms.id)
});

export type Person = typeof people.$inferSelect;
export type InsertPerson = typeof people.$inferInsert;
