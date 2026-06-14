<script lang="ts">
  let {
    sourceText = "",
    proofreadText = "",
    highlightIndex = 1,
  }: {
    sourceText?: string;
    proofreadText?: string;
    highlightIndex?: number;
  } = $props();

  let paragraphs = $derived(proofreadText.split("\n").filter(Boolean));
</script>

<div class="flex flex-1 overflow-hidden">
  <section class="flex flex-1 flex-col border-r border-[#CBCCC9]">
    <div class="flex items-center gap-2 border-b border-[#CBCCC9] px-3.5 py-1.5">
      <div class="h-1.5 w-1.5 rounded-full bg-[#CBCCC9]"></div>
      <span class="text-[11px] text-[#888888]">译文 · 简体中文</span>
      <div class="flex-1"></div>
    </div>
    <pre class="flex-1 overflow-auto p-3.5 font-mono text-sm leading-relaxed text-[#1A1A1A] whitespace-pre-wrap">{sourceText}</pre>
  </section>
  <section class="flex flex-1 flex-col border-r border-[#CBCCC9]">
    <div class="flex items-center gap-2 border-b border-[#CBCCC9] px-3.5 py-1.5">
      <div class="h-1.5 w-1.5 rounded-full bg-[#CBCCC9]"></div>
      <span class="text-[11px] text-[#888888]">校对</span>
      <div class="flex-1"></div>
      <span class="text-[10px] text-[#CBCCC9]">选中译文段落以查看建议</span>
    </div>
    <div class="flex-1 overflow-auto p-3.5">
      {#each paragraphs as para, i}
        {#if i === highlightIndex}
          <div class="rounded-sm bg-[#FFF3CD] px-1 py-0.5">
            <p class="font-mono text-sm leading-relaxed text-[#1A1A1A]">{para}</p>
          </div>
        {:else}
          <p class="font-mono text-sm leading-relaxed text-[#1A1A1A]">{para}</p>
        {/if}
      {/each}
    </div>
  </section>
</div>
