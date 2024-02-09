<script lang="ts">
	import type { Task, Person } from '$lib/db/schema';
	import { taskStore } from '../stores/TaskStore';
	import EditIcon from './EditIcon.svelte';
	import DeleteIcon from './DeleteIcon.svelte';
	export let tasks: Task[];
	export let person: Person[];

	function getPersonName(id: number) {
		return person?.find((p) => p.id === id)?.name;
	}
</script>

<ul
	class="grid max-h-[25rem] w-full flex-1 grid-flow-row grid-cols-4 items-center justify-center gap-4 overflow-y-scroll"
>
	{#each tasks as task, index}
		<li
			class="relative min-h-36 w-full border border-teal-300 p-4 text-slate-100 transition-transform duration-100 ease-in-out hover:-translate-y-2"
		>
			<h3 class="text-lg">{task.name}</h3>
			<p class="text-md">{task.description}</p>
			<p class="text-md">{task.deadline}</p>
			<p class="text-md">{getPersonName(task.assigneeId || index)}</p>
			<form method="post" action="?/deleteTask" class="absolute right-0 top-0 h-full">
				<input type="hidden" name="id" value={task.id} />
				<div
					class="flex h-full flex-col justify-between gap-1 transition-all duration-200 ease-in-out"
				>
					<button
						class="flex w-fit justify-center p-2 text-slate-100 opacity-30 hover:bg-red-500 hover:opacity-100 focus:bg-red-500 focus:opacity-100"
						type="submit"
					>
						<DeleteIcon />
					</button>
					<a
						href={`/editTask/${task.id}`}
						class="flex w-fit justify-center p-2 text-slate-100 opacity-30 hover:bg-teal-300 hover:text-slate-950 hover:opacity-100 focus:bg-teal-300 focus:text-slate-950 focus:opacity-100 active:translate-y-1"
					>
						<EditIcon />
					</a>
				</div>
			</form>
		</li>
	{/each}
	{#if $taskStore.length > 0}
		{#each $taskStore as taskStore}
			<li class="min-h-36 w-full border border-teal-300 bg-slate-900 p-4 text-slate-100">
				<h3 class="text-lg">{taskStore.name}</h3>
				<p class="text-md">{taskStore.description}</p>
			</li>
		{/each}
	{/if}
</ul>
