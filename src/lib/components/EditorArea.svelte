<script lang="ts">
  import { cn } from "$lib/utils";

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

  let targetEl: HTMLTextAreaElement;

  function handleTargetInput() {
    ontargetinput?.(targetEl.value);
    updateCursor(targetEl);
  }

  function handleTargetKeyUp() {
    updateCursor(targetEl);
  }

  function handleTargetClick() {
    updateCursor(targetEl);
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
    <pre class="flex-1 overflow-auto p-3.5 font-mono text-sm leading-relaxed text-[#1A1A1A] whitespace-pre-wrap">{sourceText}</pre>
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
      oninput={handleTargetInput}
      onkeyup={handleTargetKeyUp}
      onclick={handleTargetClick}
    ></textarea>
  </section>
</div>
