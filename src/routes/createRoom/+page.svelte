<script lang="ts">
	import { onMount } from 'svelte';

	let nameInput: HTMLInputElement;

	onMount(() => {
		nameInput.focus();
	});
</script>

<section class="flex flex-col justify-center items-center min-h-screen gap-2">
	<h1 class="text-4xl text-slate-100">Create new room</h1>
	<form method="post" class="flex flex-1 flex-col justify-center items-center gap-4 w-full">
		<div class="flex flex-col gap-2 w-1/2">
			<label class="text-slate-100" for="name">Name</label>
			<input
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
				class="text-slate-950 p-2"
				type="text"
				id="description"
				name="description"
				placeholder="Description"
			/>
		</div>
		<button
			class="border border-teal-300 text-slate-100 px-2 py-1 w-1/2 active:translate-y-1 hover:bg-teal-300 hover:text-slate-950 hover:border-teal-300 focus:bg-teal-300 focus:text-slate-950"
			type="submit"
		>
			Create room
		</button>
		<a
			href="/"
			class="border border-red-500 text-center text-slate-100 px-2 py-1 w-1/2 active:translate-y-1 hover:bg-red-500 hover:text-slate-100 hover:border-red-500 focus:bg-red-500 focus:text-slate-100"
		>
			Cancel
		</a>
	</form>
</section>
