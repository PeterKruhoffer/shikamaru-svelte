<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="flex flex-col justify-center items-center min-h-screen gap-4">
	<h1 class="text-5xl text-slate-100">{$page.status}: {$page.error?.message}</h1>
</section>
