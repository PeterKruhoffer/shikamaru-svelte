<script lang="ts">
	import { enhance } from '$app/forms';
	import { taskStore } from '$lib/stores/TaskStore';
	export let nameInput: HTMLInputElement;

	let nameEl: string;
	let descriptionEl: string;
</script>

<div class="flex w-full flex-1 items-center justify-center py-2">
	<form
		method="post"
		use:enhance={({ formData }) => {
			const name = String(formData.get('name'));
			const description = String(formData.get('description'));
			taskStore.update((prev) => [...prev, { name, description }]);
			nameEl = '';
			descriptionEl = '';
			nameInput.focus();

			return async ({ update }) => {
				await update();
				taskStore.set([]);
				nameInput.focus();
				nameEl = '';
				descriptionEl = '';
			};
		}}
		action="?/newTask"
		class="flex w-1/2 flex-col gap-2"
	>
		<label for="name" class="text-slate-100">Name</label>
		<input
			bind:this={nameInput}
			bind:value={nameEl}
			id="name"
			name="name"
			placeholder="Name"
			class="p-2 text-slate-950"
		/>
		<label for="description" class="text-slate-100">Description</label>
		<input
			bind:value={descriptionEl}
			id="description"
			name="description"
			placeholder="Description"
			class="p-2 text-slate-950"
		/>
		<button
			on:click={() => nameInput.focus}
			class="border border-teal-300 p-2 text-lg text-slate-100 hover:bg-teal-300 hover:text-slate-950 focus:bg-teal-300 focus:text-slate-950 active:translate-y-1"
		>
			Add task
		</button>
		<button
			type="button"
			class="border border-red-500 p-2 text-lg text-slate-100 hover:bg-red-500 focus:bg-red-500 active:translate-y-1"
		>
			Cancel
		</button>
	</form>
</div>
