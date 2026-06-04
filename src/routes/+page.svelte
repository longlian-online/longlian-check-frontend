<script lang="ts">
	import '../app.css';
	import { raw_text, check_text } from '$lib';
	import { diffWords } from 'diff';

	type Change = { value: string; added?: boolean; removed?: boolean };

	const diffResult: Change[] = diffWords(raw_text, check_text);
	console.log(diffResult);
</script>

<div class="flex h-screen w-full flex-col">
	<div class="flex-none p-4">
		<h1 class="text-center text-2xl font-bold">Longlian Check</h1>
	</div>
	<div class="flex flex-1">
		<div class="bg-base-300 rounded-box grow place-items-start p-4">
			{#each diffResult as part}
				{#if part.removed}
					<span class="rounded bg-red-200 px-0.5 text-red-800 line-through">{part.value}</span>
				{:else if !part.added}
					<span>{part.value}</span>
				{/if}
			{/each}
		</div>
		<div class="divider divider-horizontal"></div>
		<div class="bg-base-300 rounded-box grow place-items-start overflow-auto p-4">
			{#each diffResult as part}
				{#if part.added}
					<span class="rounded bg-green-200 px-0.5 text-green-800">{part.value}</span>
				{:else if !part.removed}
					<span>{part.value}</span>
				{/if}
			{/each}
		</div>
	</div>
</div>
