<script lang="ts">
	import '../app.css';
	import { raw_text, check_text } from '$lib';
	import { diffChars, diffWords } from 'diff';

	type Change = { value: string; added?: boolean; removed?: boolean };

	const diffResult: Change[] = diffWords(raw_text, check_text);
	console.log(diffResult);
</script>

<div class="flex h-screen w-full">
	<div class="bg-base-300 rounded-box grow place-items-start p-4">
		{#each diffResult as part}
			{#if part.removed}
				<span class="bg-red-200 text-red-800 line-through rounded px-0.5">{part.value}</span>
			{:else if !part.added}
				<span>{part.value}</span>
			{/if}
		{/each}
	</div>
	<div class="divider divider-horizontal">OR</div>
	<div class="bg-base-300 rounded-box grow place-items-start p-4 overflow-auto">
		{#each diffResult as part}
			{#if part.added}
				<span class="bg-green-200 text-green-800 rounded px-0.5">{part.value}</span>
			{:else if !part.removed}
				<span>{part.value}</span>
			{/if}
		{/each}
	</div>
</div>
