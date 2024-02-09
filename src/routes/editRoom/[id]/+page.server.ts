import type { Actions } from "./$types"
import type { PageServerLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
import { drizzle } from 'drizzle-orm/better-sqlite3';
//@ts-ignore-next-line
import Database from 'better-sqlite3';
import { rooms, people } from '$lib/db/schema';
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ params }) => {
  const sqlite = new Database('sqlite.db');
  const db = drizzle(sqlite);
  const room = db
    .select()
    .from(rooms)
    .where(eq(rooms.id, parseInt(params.id)))
    .get()

  const peoples = db
    .select()
    .from(people)
    .where(eq(people.roomId, parseInt(params.id)))
    .all()

  if (room) {
    return { room: room, peoples: peoples }
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
    const personId = String(data.get('personId'));

    const person = db.select().from(people).where(eq(people.id, parseInt(personId))).get();

    const test = { id: person?.id || 1, name: person?.name || "meh", roomId: person?.roomId }

    await db.update(rooms).set({ name, description, people: [{ id: test.id, name: test.name, roomId: test.roomId }] }).where(eq(rooms.id, parseInt(event.params.id)));

    //Maybe change status code ??
    return redirect(301, `/room/${event.params.id}`);
  }
} satisfies Actions;
