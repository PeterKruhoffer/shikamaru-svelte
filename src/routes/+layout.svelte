<script lang="ts">
	import '../app.css';
</script>

<main class="bg-slate-950 py-10 px-60 min-h-screen">
	<nav class="inline-block">
		<a href="/" class="text-slate-100 text-lg hover:underline underline-offset-2 transition-all ease-in-out duration-100 decoration-teal-300 hover:text-xl">Home</a>
	</nav>
	<slot />
</main>
