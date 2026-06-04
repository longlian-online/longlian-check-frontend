<script lang="ts">
	import '../../app.css';
	import { raw_text, check_text } from '$lib';
	import { diffWords } from 'diff';

	type WordChange = { value: string; added?: boolean; removed?: boolean };

	type LinePart = { text: string; type: string; sourceIdx: number };
	type DiffLine = { parts: LinePart[] };

	const diffResult: WordChange[] = diffWords(raw_text, check_text);

	let decisions: ('accepted' | 'rejected' | null)[] = $state(
		diffResult.map(() => null)
	);

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

	function buildLines(side: 'diff' | 'result'): DiffLine[] {
		const lines: DiffLine[] = [];
		let pending: LinePart[] = [];

		// 遍历所有 diff part，将每个 part 分配到正确的行中
		for (let idx = 0; idx < diffResult.length; idx++) {
			const part = diffResult[idx];
			const vt = visualType(part, decisions[idx], side);
			if (vt === 'hidden') {
				// diffWords 可能把 \n 字符归属到 added 部分中（而非 common 部分）。
				// 当 added 部分被拒绝（隐藏）时，如果跳过整个部分会丢失其中的 \n，
				// 导致本应换行的文本合并到同一行。这里只消耗 \n 产生换行，不追加文本。
				const segments = part.value.split('\n');
				for (let s = 0; s < segments.length - 1; s++) {
					lines.push({ parts: pending });
					pending = [];
				}
				continue;
			}

			// 按 \n 切分后，每个 except 最后一个 seg 后面都有一个 \n
			const segments = part.value.split('\n');
			for (let s = 0; s < segments.length; s++) {
				if (segments[s]) {
					pending.push({ text: segments[s], type: vt, sourceIdx: idx });
				}
				// 同一 part 内遇到 \n 就换行
				if (s < segments.length - 1) {
					lines.push({ parts: pending });
					pending = [];
				}
			}
		}

		// 收尾：确保最后一段内容也被输出
		if (pending.length > 0 || lines.length === 0) {
			lines.push({ parts: pending });
		}

		return lines;
	}

	const diffLines = $derived(buildLines('diff'));
	const resultLines = $derived(buildLines('result'));

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

<div class="flex h-screen w-full flex-col">
	<div class="flex-none p-4">
		<h1 class="text-center text-2xl font-bold">Longlian Check</h1>
	</div>
	<div class="flex flex-1 overflow-hidden">
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
								<span class="relative inline-block group cursor-pointer">
									<span class={partClass(part.type)}>{part.text}</span>
									<span
										class="absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded backdrop-blur-sm group-hover:flex bg-base-100/80"
									>
										<button
											class="rounded px-1 py-0.5 text-xs font-bold text-success hover:bg-success/10"
											onclick={() => accept(part.sourceIdx)}
										>✓</button>
										<button
											class="rounded px-1 py-0.5 text-xs font-bold text-error hover:bg-error/10"
											onclick={() => reject(part.sourceIdx)}
										>✗</button>
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
						{#each line.parts as part}
							{part.text}
						{/each}
					</span>
				</div>
			{/each}
		</div>
	</div>
</div>
