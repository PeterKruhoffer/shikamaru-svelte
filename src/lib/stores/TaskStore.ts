import { writable } from 'svelte/store';
import { type Task } from '$lib/db/schema';

const taskStore = writable<Task[]>([]);

export { taskStore };
