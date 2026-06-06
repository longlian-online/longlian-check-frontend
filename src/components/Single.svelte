<script lang="ts">
	import '../app.css';
	import { raw_text, check_text } from '$lib';
	import { diffWords } from 'diff';

	type WordChange = { value: string; added?: boolean; removed?: boolean };

	type LinePart = { text: string; type: string; sourceIdx: number };
	type DiffLine = { parts: LinePart[] };

	const { submitResultText }: { submitResultText: (text: string) => void } = $props();

	// 计算 raw_text 和 check_text 之间的差异，得到一个包含所有变更的数组。
	const diffResult: WordChange[] = diffWords(raw_text, check_text);

	let decisions: ('accepted' | 'rejected' | null)[] = $state(diffResult.map(() => null));

	function visualType(
		part: WordChange,
		decision: 'accepted' | 'rejected' | null,
		side: 'diff' | 'result'
	): string {
		if (side === 'diff') {
			if (part.removed) {
				if (decision === 'rejected') return 'unchanged';
				if (decision === 'accepted') return 'removed-done';
				return 'removed';
			}
			if (part.added) {
				if (decision === 'rejected') return 'added-rejected';
				if (decision === 'accepted') return 'unchanged';
				return 'added';
			}
			return 'unchanged';
		} else {
			if (part.removed && decision !== 'rejected') return 'hidden';
			if (part.added && decision === 'rejected') return 'hidden';
			return 'unchanged';
		}
	}

	function buildDiffLines(): DiffLine[] {
		// 左侧 diff 视图：所有 part 都可见，按视觉类型着色
		const lines: DiffLine[] = [];
		let pending: LinePart[] = [];

		for (let idx = 0; idx < diffResult.length; idx++) {
			const part = diffResult[idx];
			const vt = visualType(part, decisions[idx], 'diff');
			// 按 \n 拆分，段与段之间即为换行位置
			const segments = part.value.split('\n');

			for (let s = 0; s < segments.length; s++) {
				if (segments[s]) {
					pending.push({ text: segments[s], type: vt, sourceIdx: idx });
				}
				// 遇到换行就结束当前行
				if (s < segments.length - 1) {
					lines.push({ parts: pending });
					pending = [];
				}
			}
		}

		if (pending.length > 0 || lines.length === 0) {
			lines.push({ parts: pending });
		}

		return lines;
	}

	function buildResultLines(): string[] {
		// 右侧结果视图：只关心最终每一行显示的字符串
		const lines: string[] = [];
		let pending = '';

		for (let idx = 0; idx < diffResult.length; idx++) {
			const part = diffResult[idx];
			const vt = visualType(part, decisions[idx], 'result');

			if (vt === 'hidden') {
				// 被隐藏的部分不输出文本，但其中的 \n 仍需产生换行，
				// 否则拒绝一个含换行的 added 段会导致上下行合并
				const segments = part.value.split('\n');
				for (let s = 0; s < segments.length - 1; s++) {
					lines.push(pending);
					pending = '';
				}
				continue;
			}

			const segments = part.value.split('\n');
			for (let s = 0; s < segments.length; s++) {
				pending += segments[s];
				if (s < segments.length - 1) {
					lines.push(pending);
					pending = '';
				}
			}
		}

		if (pending || lines.length === 0) {
			lines.push(pending);
		}

		return lines;
	}

	const diffLines = $derived(buildDiffLines());
	const resultLines = $derived(buildResultLines());

	const resultText = $derived(resultLines.join('\n'));

	$effect(() => {
		submitResultText(resultText);
	});

	function accept(idx: number) {
		decisions[idx] = 'accepted';
	}
	function reject(idx: number) {
		decisions[idx] = 'rejected';
	}

	function partClass(type: string): string {
		if (type === 'removed') return 'bg-red-200 text-red-800 line-through rounded px-0.5';
		if (type === 'removed-done') return 'bg-red-100 text-red-400/60 line-through rounded px-0.5';
		if (type === 'added') return 'bg-green-200 text-green-800 rounded px-0.5';
		if (type === 'added-rejected') return 'bg-gray-200 text-gray-500 line-through rounded px-0.5';
		return '';
	}
</script>

<!-- 左侧：完整 diff，removed 标红、added 标绿，均可交互 -->
<div class="flex-1 overflow-auto font-mono text-sm leading-relaxed">
	{#each diffLines as line, i}
		<div class="flex">
			<span
				class="border-base-content/10 bg-base-300 text-base-content/40 sticky left-0 w-10 shrink-0 border-r py-0.5 pr-2 text-right select-none"
				>{i + 1}</span
			>
			<span class="py-0.5 pl-2 break-words whitespace-pre-wrap">
				{#each line.parts as part}
					{#if part.type === 'removed' || part.type === 'removed-done' || part.type === 'added' || part.type === 'added-rejected'}
						<span class="group relative inline-block cursor-pointer">
							<span class={partClass(part.type)}>{part.text}</span>
							<span
								class="bg-base-100/80 absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded backdrop-blur-sm group-hover:flex"
							>
								<button
									class="text-success hover:bg-success/10 rounded px-1 py-0.5 text-xs font-bold"
									onclick={() => accept(part.sourceIdx)}>✓</button
								>
								<button
									class="text-error hover:bg-error/10 rounded px-1 py-0.5 text-xs font-bold"
									onclick={() => reject(part.sourceIdx)}>✗</button
								>
							</span>
						</span>
					{:else}
						{part.text}
					{/if}
				{/each}
			</span>
		</div>
	{/each}
</div>

<div class="divider divider-horizontal"></div>

<!-- 右侧：纯结果展示，无交互 -->
<div class="flex-1 overflow-auto font-mono text-sm leading-relaxed">
	{#each resultLines as line, i}
		<div class="flex">
			<span
				class="border-base-content/10 bg-base-300 text-base-content/40 sticky left-0 w-10 shrink-0 border-r py-0.5 pr-2 text-right select-none"
				>{i + 1}</span
			>
			<span class="py-0.5 pl-2 break-words whitespace-pre-wrap">
				{line}
			</span>
		</div>
	{/each}
</div>
