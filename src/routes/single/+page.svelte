<script lang="ts">
	import { raw_text } from '$lib';
	import Export from '../../components/Export.svelte';
	import Single from '../../components/Single.svelte';

	let resultText = $state('');
	let checkText = $state<string>('');
	let aiCheckText = $state<string>('');

	async function handleFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		try {
			checkText = await file.text();
		} catch (err) {
			console.error('读取文件失败:', err);
			throw err
		}

		// 发送给服务器进行校对
		aiCheckText = await requestCheck(checkText)
	}

	async function requestCheck(text: string): Promise<string> {
		const result = await fetch("http://127.0.0.1:8101/check", {
			method: "POST",
			body: JSON.stringify({
				"raw_text": text
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		if (result.status !== 200) {
			throw new Error("获取校对结果失败")
		}
		return result.text();
	}
</script>

<div class="flex h-screen w-full flex-col">
	<!-- 顶部标题栏固定高度，底部内容占满剩余空间并允许滚动 -->
	<div class="flex flex-none p-4">
		<div class="flex-1">
			<input
				type="file"
				class="file-input file-input-primary"
				accept=".txt"
				onchange={handleFileChange}
			/>
		</div>
		<h1 class="flex-1 text-center text-2xl font-bold">Longlian Check</h1>
		<div class="flex flex-1 justify-end">
			<Export text={resultText}></Export>
		</div>
	</div>
	<!-- 内容区域 -->
	<div class="flex flex-1 overflow-hidden">
		<Single
			rawText={checkText}
			resultText={aiCheckText}
			submitResultText={(text) => {
				resultText = text;
			}}
		></Single>
	</div>
</div>
