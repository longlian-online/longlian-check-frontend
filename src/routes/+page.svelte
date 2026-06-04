<script lang="ts">
	import '../app.css';
	import { raw_text, check_text } from '$lib';
	import { diffWords } from 'diff';

	// diff 库返回的单个变更块
	type WordChange = { value: string; added?: boolean; removed?: boolean };

	// 行内的一个片段（连续相同状态的文字）
	type LinePart = { text: string; type: string };
	// 由多个片段组成的一行
	type DiffLine = { parts: LinePart[] };

	// 对整个文本做单词级 diff
	const diffResult: WordChange[] = diffWords(raw_text, check_text);

	/**
	 * 根据一侧的过滤条件，将 diffResult 按 \n 切分为可渲染的行。
	 * left 侧只取 unchanged + removed，right 侧只取 unchanged + added。
	 *
	 * 思路：先将 diff 结果展开为{字符,类型}序列，
	 *       再按换行符分段，合并同一行内相邻的相同类型文字。
	 */
	function buildLines(side: 'left' | 'right'): DiffLine[] {
		// 展开为字符序列，每个字符附带其在 diff 中的状态
		const chars: { char: string; type: string }[] = [];

		for (const part of diffResult) {
			if (side === 'left' && part.added) continue;
			if (side === 'right' && part.removed) continue;

			const type = part.removed ? 'removed' : part.added ? 'added' : 'unchanged';
			for (const char of part.value) {
				chars.push({ char, type });
			}
		}

		// 按 \n 切分行，行内合并相邻同类型片段
		const lines: DiffLine[] = [];
		let current: LinePart[] = [];

		for (const c of chars) {
			if (c.char === '\n') {
				// 换行符终结当前行
				lines.push({ parts: current });
				current = [];
			} else {
				const last = current[current.length - 1];
				if (last && last.type === c.type) {
					// 与上一片段类型相同，合并
					last.text += c.char;
				} else {
					// 类型不同，开启新片段
					current.push({ text: c.char, type: c.type });
				}
			}
		}

		// 最后一行（文件末尾可能没有换行符）
		if (current.length > 0 || lines.length === 0) {
			lines.push({ parts: current });
		}

		return lines;
	}

	// 两侧分别独立构建行
	const leftLines = buildLines('left');
	const rightLines = buildLines('right');
</script>

<div class="flex h-screen w-full flex-col">
	<div class="flex-none p-4">
		<h1 class="text-center text-2xl font-bold">Longlian Check</h1>
	</div>
	<div class="flex flex-1 overflow-hidden">
		<!-- 左侧：原文，删除内容标红 -->
		<div class="flex-1 overflow-auto font-mono text-sm leading-relaxed">
			{#each leftLines as line, i}
				<div class="flex">
					<span class="sticky left-0 w-10 shrink-0 border-r border-base-content/10 bg-base-300 py-0.5 pr-2 text-right text-base-content/40 select-none">{i + 1}</span>
					<span class="whitespace-pre-wrap break-words py-0.5 pl-2">
						{#each line.parts as part}
							<span
								class={part.type === 'removed' ? 'bg-red-200 text-red-800 line-through rounded px-0.5' : ''}
							>{part.text}</span>
						{/each}
					</span>
				</div>
			{/each}
		</div>

		<div class="divider divider-horizontal"></div>

		<!-- 右侧：check 结果，新增内容标绿 -->
		<div class="flex-1 overflow-auto font-mono text-sm leading-relaxed">
			{#each rightLines as line, i}
				<div class="flex">
					<span class="sticky left-0 w-10 shrink-0 border-r border-base-content/10 bg-base-300 py-0.5 pr-2 text-right text-base-content/40 select-none">{i + 1}</span>
					<span class="whitespace-pre-wrap break-words py-0.5 pl-2">
						{#each line.parts as part}
							<span
								class={part.type === 'added' ? 'bg-green-200 text-green-800 rounded px-0.5' : ''}
							>{part.text}</span>
						{/each}
					</span>
				</div>
			{/each}
		</div>
	</div>
</div>
