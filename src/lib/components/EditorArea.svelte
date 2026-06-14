<script lang="ts">
  let {
    sourceLabel = "原文",
    targetLabel = "译文",
    sourceText = "",
    targetText = "",
    sourceBadge,
    onsourceinput,
    ontargetinput,
    oncursorchange,
  }: {
    sourceLabel?: string;
    targetLabel?: string;
    sourceText?: string;
    targetText?: string;
    sourceBadge?: string;
    onsourceinput?: (text: string) => void;
    ontargetinput?: (text: string) => void;
    oncursorchange?: (pos: string) => void;
  } = $props();

  let sourceEl: HTMLTextAreaElement;
  let targetEl: HTMLTextAreaElement;

  function handleInput(el: HTMLTextAreaElement, callback?: (t: string) => void) {
    callback?.(el.value);
    updateCursor(el);
  }

  function handleCursor(el: HTMLTextAreaElement) {
    updateCursor(el);
  }

  function updateCursor(el: HTMLTextAreaElement) {
    const pos = el.selectionStart;
    const text = el.value;
    const before = text.slice(0, pos);
    const line = (before.match(/\n/g) || []).length + 1;
    const col = pos - before.lastIndexOf("\n");
    oncursorchange?.(`行 ${line}, 列 ${col}`);
  }
</script>

<div class="flex flex-1 overflow-hidden">
  <section class="flex flex-1 flex-col border-r border-[#CBCCC9]">
    <div class="flex items-center gap-2 border-b border-[#CBCCC9] px-3.5 py-1.5">
      <div class="h-1.5 w-1.5 rounded-full bg-[#CBCCC9]"></div>
      <span class="text-[11px] text-[#888888]">{sourceLabel}</span>
      {#if sourceBadge}
        <span class="rounded-sm bg-[#F2F3F0] px-2 py-0.5 text-[10px] text-[#CBCCC9]">{sourceBadge}</span>
      {/if}
      <div class="flex-1"></div>
    </div>
    <textarea
      bind:this={sourceEl}
      class="flex-1 resize-none border-none bg-transparent p-3.5 font-mono text-sm leading-relaxed text-[#1A1A1A] whitespace-pre-wrap outline-none"
      value={sourceText}
      oninput={() => handleInput(sourceEl, onsourceinput)}
      onkeyup={() => handleCursor(sourceEl)}
      onclick={() => handleCursor(sourceEl)}
    ></textarea>
  </section>
  <section class="flex flex-1 flex-col border-r border-[#CBCCC9]">
    <div class="flex items-center gap-2 border-b border-[#CBCCC9] px-3.5 py-1.5">
      <div class="h-1.5 w-1.5 rounded-full bg-[#CBCCC9]"></div>
      <span class="text-[11px] text-[#888888]">{targetLabel}</span>
      <div class="flex-1"></div>
    </div>
    <textarea
      bind:this={targetEl}
      class="flex-1 resize-none border-none bg-transparent p-3.5 font-mono text-sm leading-relaxed text-[#1A1A1A] whitespace-pre-wrap outline-none"
      value={targetText}
      oninput={() => handleInput(targetEl, ontargetinput)}
      onkeyup={() => handleCursor(targetEl)}
      onclick={() => handleCursor(targetEl)}
    ></textarea>
  </section>
</div>
