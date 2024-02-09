import type { Actions } from "./$types"
import type { PageServerLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
import { drizzle } from 'drizzle-orm/better-sqlite3';
//@ts-ignore-next-line
import Database from 'better-sqlite3';
import { tasks, people } from '$lib/db/schema';
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ params }) => {
  const sqlite = new Database('sqlite.db');
  const db = drizzle(sqlite);
  const task = db
    .select()
    .from(tasks)
    .where(eq(tasks.id, parseInt(params.id)))
    .get()

  const peoples = db
    .select()
    .from(people)
    .where(eq(people.roomId, task?.roomId!))
    .all()

  if (task) {
    return { task, peoples }
  }

  error(404, "Room not found")
}

export const actions = {
  default: async (event) => {
    const sqlite = new Database('sqlite.db');
    const db = drizzle(sqlite);

    const data = await event.request.formData();
    const name = String(data.get('name'));
    const description = String(data.get('description'));
    const roomId = String(data.get('roomId'));
    const deadline = String(data.get('deadline'));
    const assigneeId = String(data.get('assigneeId'));

    await db.update(tasks).set({ name, description, deadline, assigneeId: parseInt(assigneeId) }).where(eq(tasks.id, parseInt(event.params.id)));

    //Maybe change status code ??
    return redirect(301, `/room/${roomId}`);
  }
} satisfies Actions;
