import type { Actions } from "./$types"
import type { PageServerLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
import { drizzle } from 'drizzle-orm/better-sqlite3';
//@ts-ignore-next-line
import Database from 'better-sqlite3';
import { rooms, tasks, people } from '$lib/db/schema';
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ params }) => {
  const sqlite = new Database('sqlite.db');
  const db = drizzle(sqlite);
  const room = db
    .select()
    .from(rooms)
    .where(eq(rooms.id, parseInt(params.id)))
    .get()
  const task = db
    .select()
    .from(tasks)
    .where(eq(tasks.roomId, parseInt(params.id)))
    .all()

  const peoples = db
    .select()
    .from(people)
    .where(eq(people.roomId, parseInt(params.id)))
    .all()

  if (room) {
    return { room: room, tasks: task, people: peoples }
  }

  error(404, "Room not found")
}

export const actions = {
  delete: async (event) => {
    const id = event.params.id
    const sqlite = new Database('sqlite.db');
    const db = drizzle(sqlite);
    await db.delete(rooms).where(eq(rooms.id, parseInt(id)))

    //should probably be a different statuscode???
    redirect(301, "/")
  },
  deleteTask: async (event) => {
    const data = await event.request.formData()
    const id = String(data.get('id'))
    const sqlite = new Database('sqlite.db');
    const db = drizzle(sqlite);
    await db.delete(tasks).where(eq(tasks.id, parseInt(id)))
  },
  newTask: async (event) => {
    const id = event.params.id
    const data = await event.request.formData();
    const sqlite = new Database('sqlite.db');
    const db = drizzle(sqlite);
    const name = String(data.get('name'));
    const description = String(data.get('description'));

    const res = await db
      .insert(tasks)
      .values({
        name: name,
        description: description,
        roomId: parseInt(id)
      })
      .returning()

    return {
      task: res
    }
  },
} satisfies Actions;
