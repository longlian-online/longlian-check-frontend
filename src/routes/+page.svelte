<script lang="ts">
  import TopBar from "$lib/components/TopBar.svelte";
  import ProjectSidebar from "$lib/components/ProjectSidebar.svelte";
  import EditorArea from "$lib/components/EditorArea.svelte";
  import ProofreadArea from "$lib/components/ProofreadArea.svelte";
  import SuggestionPanel from "$lib/components/SuggestionPanel.svelte";
  import StatusBar from "$lib/components/StatusBar.svelte";
  import TerminologyView from "$lib/components/TerminologyView.svelte";
  import SettingsContent from "$lib/components/SettingsContent.svelte";

  type Mode = "翻译模式" | "校对模式" | "术语库" | "设置";

  let mode = $state<Mode>("翻译模式");
  let activeChapter = $state(0);
  let cursorPos = $state("行 1, 列 1");
  let sourceText = $state(
    "The old clock tower stood silent against the grey November sky, its hands frozen at a quarter past three. No one in the village could remember when it had last chimed, but everyone agreed — it had been at least a generation.\n\nBelow the tower, Mù Jūchí paused to adjust the collar of his coat. The wind carried the scent of rain and fallen leaves.\n\n\"You're late,\" said a voice from the shadows.\n\nHe turned. A woman stepped out from the archway, her features half-hidden by the brim of a dark felt hat. In her gloved hand, she held a leather notebook — the same notebook he had last seen on his father's desk, ten years ago.",
  );
  let targetText = $state(
    "古老的钟楼矗立在十一月灰色的天空下，指针凝固在三点一刻。村里已没有人记得它最后一次报时是什么时候，但大家都一致认为——至少已有一代人的光景。\n\n钟楼下，暮居池停下脚步，理了理大衣的领子。风里带着雨水和落叶的气息。\n\n\"你迟到了。\"阴影中传来一个声音。\n\n他转过身。一位女子从拱门下走出来，宽檐黑帽半掩着她的面容。戴着手套的手中，她握着一本皮面笔记——正是他十年前最后一次在父亲书桌上见到的那本。",
  );

  const chapters = [
    { label: "§ 第一章 · 序幕" },
    { label: "§ 第二章 · 雨夜" },
    { label: "§ 第三章 · 归途" },
  ];
  const chapterTexts: Record<number, { source: string; target: string }> = {
    0: {
      source:
        "The old clock tower stood silent against the grey November sky, its hands frozen at a quarter past three. No one in the village could remember when it had last chimed, but everyone agreed — it had been at least a generation.\n\nBelow the tower, Mù Jūchí paused to adjust the collar of his coat. The wind carried the scent of rain and fallen leaves.\n\n\"You're late,\" said a voice from the shadows.\n\nHe turned. A woman stepped out from the archway, her features half-hidden by the brim of a dark felt hat. In her gloved hand, she held a leather notebook — the same notebook he had last seen on his father's desk, ten years ago.",
      target:
        "古老的钟楼矗立在十一月灰色的天空下，指针凝固在三点一刻。村里已没有人记得它最后一次报时是什么时候，但大家都一致认为——至少已有一代人的光景。\n\n钟楼下，暮居池停下脚步，理了理大衣的领子。风里带着雨水和落叶的气息。\n\n\"你迟到了。\"阴影中传来一个声音。\n\n他转过身。一位女子从拱门下走出来，宽檐黑帽半掩着她的面容。戴着手套的手中，她握着一本皮面笔记——正是他十年前最后一次在父亲书桌上见到的那本。",
    },
    1: {
      source:
        "The rain began as a gentle patter against the windowpanes, gradually swelling into a torrent that drowned out all other sound. Mù Jūchí sat alone in the study, the leather notebook open before him. His father's handwriting — elegant and precise — filled every page.\n\n\"Some doors, once opened, cannot be closed,\" read the first line.\n\nHe traced the words with his fingertip, as if he could absorb their meaning through touch alone.",
      target:
        "雨开始轻轻敲打窗玻璃，渐渐变成倾盆大雨，淹没了所有其他声音。暮居池独自坐在书房里，面前的皮面笔记翻开著。父亲的字迹——优雅而精确——写满了每一页。\n\n\"有些门，一旦打开，就无法再关上。\"第一行这样写道。\n\n他用指尖描摹着这些字句，仿佛仅凭触感就能领悟它们的含义。",
    },
    2: {
      source:
        "The road home had never seemed longer. Autumn leaves carpeted the path in shades of amber and rust, crunching beneath his boots with each weary step. The village lay ahead, smoke curling from chimneys into the twilight sky.\n\nHome. The word felt foreign now, after everything he had discovered.\n\nHe clutched the notebook tighter and pressed forward.",
      target:
        "回家的路从未显得如此漫长。秋叶将小路铺成琥珀色与锈红色的地毯，在他疲惫的脚步下沙沙作响。村庄就在前方，炊烟袅袅升入暮色的天空。\n\n家。在经历了这一切之后，这个词如今显得如此陌生。\n\n他把笔记攥得更紧，继续向前走去。",
    },
  };

  const transSuggestions = [
    { word: "stood silent", reason: "保持拟人化修辞，与「silent」形成头韵" },
    { word: "loomed", reason: "带压迫感，契合后文「阴影」「宽檐黑帽」的暗色调" },
    { word: "towered", reason: "字面直译，保留空间高度感" },
    { word: "rose", reason: "极简风格，与后续长句形成节奏对比" },
  ];

  const proofSuggestions = [
    { label: "[1] \"矗立\" → \"沉默地矗立\"", reason: "补回原文 \"stood silent\" 的拟人修辞，与「灰色天空」「钟楼」的静默氛围一致" },
    { label: "[2] \"凝固\" → \"冻结\"", reason: "更贴合原文 \"frozen\" 的冰意象，与后文十一月灰暗天空的寒冷基调一致" },
    { label: "[3] \"都一致认为\" → 可省略", reason: "\"everyone agreed\" 在中文叙事语境中冗余，省略后节奏更紧凑" },
  ];

  function handleTabChange(tab: string) {
    mode = tab as Mode;
  }

  function handleChapterClick(index: number) {
    activeChapter = index;
    const texts = chapterTexts[index];
    sourceText = texts.source;
    targetText = texts.target;
    cursorPos = "行 1, 列 1";
  }

  const termEntries = [
    { source: "Mù Jūchí", target: "暮居池" },
    { source: "clock tower", target: "钟楼" },
    { source: "leather notebook", target: "皮面笔记" },
    { source: "archway", target: "拱门" },
    { source: "Dark Felt Hat", target: "宽檐黑帽" },
    { source: "chimed", target: "报时" },
  ];

  function handleSettingsClick() {
    mode = "设置";
  }

  function handleAdopt(index: number) {
    if (mode === "校对模式") {
      const sug = proofSuggestions[index];
      console.log("采纳校对建议:", sug.label);
    } else {
      const sug = transSuggestions[index];
      console.log("采纳翻译建议:", sug.word);
    }
  }

  function handleCopy(index: number) {
    const sug = transSuggestions[index];
    navigator.clipboard.writeText(sug.word);
  }

  function handleIgnore(index: number) {
    const sug = proofSuggestions[index];
    console.log("忽略校对建议:", sug.label);
  }
</script>

<div class="flex h-screen flex-col overflow-hidden">
  <TopBar activeTab={mode} showUserMeta={mode === "术语库"} ontabchange={handleTabChange} />

  <div class="flex flex-1 overflow-hidden">
    <ProjectSidebar
      {chapters}
      {activeChapter}
      onchapterclick={handleChapterClick}
      onsettingsclick={handleSettingsClick}
    />

    {#if mode === "翻译模式"}
      <EditorArea
        {sourceText}
        {targetText}
        ontargetinput={(t) => (targetText = t)}
        oncursorchange={(p) => (cursorPos = p)}
      />
    {:else if mode === "校对模式"}
      <ProofreadArea
        {sourceText}
        proofreadText={targetText}
        highlightIndex={1}
      />
    {:else if mode === "术语库"}
      <TerminologyView entries={termEntries} />
    {:else if mode === "设置"}
      <SettingsContent />
    {/if}

    {#if mode === "翻译模式"}
      <SuggestionPanel
        title="AI 翻译建议"
        subtitle="矗立"
        suggestions={transSuggestions}
        mode="translation"
        onadopt={handleAdopt}
        oncopy={handleCopy}
      />
    {:else if mode === "校对模式"}
      <SuggestionPanel
        title="校对建议"
        suggestions={proofSuggestions}
        mode="proofreading"
        onadopt={handleAdopt}
        onignore={handleIgnore}
      />
    {/if}
  </div>

  <StatusBar
    suggestionCount={mode === "翻译模式" ? transSuggestions.length : mode === "校对模式" ? proofSuggestions.length : 0}
    chatCount={mode === "翻译模式" || mode === "校对模式" ? 3 : 0}
    cursorPos={mode === "设置" ? "" : cursorPos}
  />
</div>
