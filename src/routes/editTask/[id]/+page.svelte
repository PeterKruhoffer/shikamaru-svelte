<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let nameInput: HTMLInputElement;

	onMount(() => {
		nameInput.focus();
	});
</script>

<section class="flex flex-col justify-center items-center min-h-screen">
	<h1 class="text-slate-100 text-4xl py-4">Edit task</h1>
	<form method="post" class="flex-1 flex flex-col justify-center items-center gap-4 w-full">
		<input type="hidden" name="roomId" value={data.task.roomId} />
		<div class="flex flex-col gap-2 w-1/2">
			<label class="text-slate-100" for="name">Name</label>
			<input
				bind:value={data.task.name}
				bind:this={nameInput}
				class="text-slate-950 p-2"
				type="text"
				id="name"
				name="name"
				placeholder="Name of the room"
			/>
		</div>
		<div class="flex flex-col gap-2 w-1/2">
			<label class="text-slate-100" for="description">Description</label>
			<input
				bind:value={data.task.description}
				class="text-slate-950 p-2"
				type="text"
				id="description"
				name="description"
				placeholder="Description"
			/>
		</div>
		<div class="flex flex-col gap-2 w-1/2">
			<label class="text-slate-100" for="description">Deadline</label>
			<input
				bind:value={data.task.deadline}
				class="text-slate-950 p-2"
				type="text"
				id="deadline"
				name="deadline"
				placeholder="Deadline"
			/>
		</div>
		<div class="flex flex-col gap-2 w-1/2">
			<label class="text-slate-100" for="assigneeId">Person</label>
			<select
				bind:value={data.task.assigneeId}
				class="text-slate-950 p-2"
				id="assigneeId"
				name="assigneeId"
			>
				<option value="">Select person</option>
				{#each data.peoples || [] as person}
					{#if person.roomId === data.task.roomId}
						<option value={person.id}>{person.name}</option>
					{/if}
				{/each}
			</select>
		</div>
		<button
			class="border border-teal-300 text-slate-100 px-2 py-1 w-1/2 active:translate-y-1 hover:bg-teal-300 hover:text-slate-950 hover:border-teal-300 focus:bg-teal-300 focus:text-slate-950"
			type="submit"
		>
			Edit
		</button>
		<a
			href={`/room/${data.task.roomId}`}
			class="border border-red-500 text-center text-slate-100 px-2 py-1 w-1/2 active:translate-y-1 hover:bg-red-500 hover:text-slate-100 hover:border-red-500 focus:bg-red-500 focus:text-slate-100"
		>
			Cancel
		</a>
	</form>
</section>
