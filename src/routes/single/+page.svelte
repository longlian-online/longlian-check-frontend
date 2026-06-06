<script>
	import Export from "../../components/Export.svelte";
	import Single from "../../components/Single.svelte";

	let resultText = $state('');

</script>
<div class="flex h-screen w-full flex-col">
	<!-- 顶部标题栏固定高度，底部内容占满剩余空间并允许滚动 -->
	<div class="flex flex-none p-4">
		<div class="flex-1"></div>
		<h1 class="flex-1 text-center text-2xl font-bold">Longlian Check</h1>
		<div class="flex-1 flex justify-end">
            <Export text={resultText}></Export>
		</div>
	</div>
	<!-- 内容区域 -->
	<div class="flex flex-1 overflow-hidden">
		<Single submitResultText={(text)=>{resultText = text; console.log("Received result text:", text);}}></Single>
	</div>
</div>
