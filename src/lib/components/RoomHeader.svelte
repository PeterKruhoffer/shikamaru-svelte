<script lang="ts">
	import type { Room } from '$lib/db/schema';
	import EditIcon from './EditIcon.svelte';
	import DeleteIcon from './DeleteIcon.svelte';

	export let room: Room;
</script>

<div class="relative flex w-full flex-1 flex-col text-center text-slate-100">
	<h1 class="text-4xl">{room.name}</h1>
	<p class="py-2 text-lg">{room.description}</p>
	<form method="post" action="?/delete" class="absolute right-0 top-0 flex gap-2">
		<a
			class="px-4 py-2 text-slate-100 hover:bg-teal-300 hover:text-slate-950 focus:bg-teal-300 focus:text-slate-950"
			href={`/editRoom/${room.id}`}
		>
			<EditIcon />
		</a>
		<button
			class="px-4 py-2 text-slate-100 hover:border-red-500 hover:bg-red-500 focus:border-red-500 focus:bg-red-500"
			type="submit"
		>
			<DeleteIcon />
		</button>
	</form>
</div>
