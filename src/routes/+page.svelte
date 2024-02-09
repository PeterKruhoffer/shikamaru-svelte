<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="flex min-h-screen flex-col items-center justify-center">
	<section class="flex flex-col items-center justify-center gap-2">
		<h1 class="text-4xl text-slate-100">Shikamaru</h1>
	</section>
	<section class="flex w-full flex-1 flex-col items-center justify-center gap-4 py-4">
		{#if !data.rooms}
			<p class="text-slate-100">No rooms found</p>
		{:else}
			{#each data.rooms as room}
				<a
					href={`/room/${room.id}`}
					class="w-1/2 bg-teal-300 p-4 text-slate-900 transition-all duration-100 ease-in-out hover:-translate-x-4"
				>
					<h2 class="text-xl">{room.name}</h2>
					<p>{room.description}</p>
				</a>
			{/each}
		{/if}
		<a
			href="/createRoom"
			class="border border-teal-300 px-4 py-2 text-xl text-slate-100 hover:border-teal-500 hover:bg-teal-300 hover:text-slate-950 focus:bg-teal-300 focus:text-slate-950 active:translate-y-1"
		>
			Create new Room
		</a>
	</section>
</main>
