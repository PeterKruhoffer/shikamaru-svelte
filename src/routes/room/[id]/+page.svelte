<script lang="ts">
	import AddTask from '$lib/components/AddTask.svelte';
	import RoomHeader from '$lib/components/RoomHeader.svelte';
	import Tasks from '$lib/components/Tasks.svelte';
	import People from '$lib/components/People.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let nameInput: HTMLInputElement;
</script>

<section class="flex min-h-screen flex-col items-center justify-center">
	<RoomHeader room={data.room} />
	<People people={data.people} />
	<Tasks tasks={data.tasks} person={data.people} />
	<AddTask {nameInput} />
</section>
