<script lang="ts">
	import { type Person } from '$lib/db/schema';
	export let people: Person[];
</script>

<section
	class="flex max-h-44 w-full flex-col items-start justify-start gap-4 overflow-y-scroll p-4"
>
	<h2 class="text-xl text-slate-100">People in room:</h2>
	{#each people as person}
		<p class="border border-teal-300 p-2 text-lg text-slate-100 hover:-translate-x-2 transition-transform ease-in-out duration-100">{person.name}</p>
	{/each}
</section>
