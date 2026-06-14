<script lang="ts">
  import TopBar from "$lib/components/TopBar.svelte";
  import ProjectSidebar from "$lib/components/ProjectSidebar.svelte";
  import EditorArea from "$lib/components/EditorArea.svelte";
  import SuggestionPanel from "$lib/components/SuggestionPanel.svelte";
  import StatusBar from "$lib/components/StatusBar.svelte";

  const chapters = [
    { label: "§ 第一章 · 序幕", active: true },
    { label: "§ 第二章 · 雨夜", active: false },
    { label: "§ 第三章 · 归途", active: false },
  ];

  const suggestions = [
    { word: "stood silent", reason: "保持拟人化修辞，与「silent」形成头韵" },
    { word: "loomed", reason: "带压迫感，契合后文「阴影」「宽檐黑帽」的暗色调" },
    { word: "towered", reason: "字面直译，保留空间高度感" },
    { word: "rose", reason: "极简风格，与后续长句形成节奏对比" },
  ];

  const sourceText = `The old clock tower stood silent against the grey November sky, its hands frozen at a quarter past three. No one in the village could remember when it had last chimed, but everyone agreed — it had been at least a generation.<br /><br />Below the tower, Mù Jūchí paused to adjust the collar of his coat. The wind carried the scent of rain and fallen leaves.<br /><br />"You're late," said a voice from the shadows.<br /><br />He turned. A woman stepped out from the archway, her features half-hidden by the brim of a dark felt hat. In her gloved hand, she held a leather notebook — the same notebook he had last seen on his father's desk, ten years ago.`;

  const targetText = `古老的钟楼矗立在十一月灰色的天空下，指针凝固在三点一刻。村里已没有人记得它最后一次报时是什么时候，但大家都一致认为——至少已有一代人的光景。<br /><br />钟楼下，暮居池停下脚步，理了理大衣的领子。风里带着雨水和落叶的气息。<br /><br />"你迟到了。"阴影中传来一个声音。<br /><br />他转过身。一位女子从拱门下走出来，宽檐黑帽半掩着她的面容。戴着手套的手中，她握着一本皮面笔记——正是他十年前最后一次在父亲书桌上见到的那本。`;
</script>

<div class="flex h-screen flex-col overflow-hidden">
  <TopBar activeTab="翻译模式" />

  <div class="flex flex-1 overflow-hidden">
    <ProjectSidebar {chapters} />

    <EditorArea {sourceText} {targetText} />

    <SuggestionPanel title="AI 翻译建议" subtitle="矗立" {suggestions} />
  </div>

  <StatusBar suggestionCount={4} chatCount={3} cursorPos="行 12, 列 24" />
</div>
