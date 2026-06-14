<script lang="ts">
  let {
    sourceLabel = "原文",
    targetLabel = "译文",
    sourceText = "",
    targetText = "",
  }: {
    sourceLabel?: string;
    targetLabel?: string;
    sourceText?: string;
    targetText?: string;
  } = $props();
</script>

<div class="flex flex-1 overflow-hidden">
  <section class="flex flex-1 flex-col border-r border-[#CBCCC9]">
    <div class="flex items-center gap-2 border-b border-[#CBCCC9] px-3.5 py-1.5">
      <div class="h-1.5 w-1.5 rounded-full bg-[#CBCCC9]"></div>
      <span class="text-[11px] text-[#888888]">{sourceLabel}</span>
      <div class="flex-1"></div>
    </div>
    <div class="flex-1 overflow-auto p-3.5">
      <p class="font-mono text-sm leading-relaxed text-[#1A1A1A]">{@html sourceText}</p>
    </div>
  </section>
  <section class="flex flex-1 flex-col border-r border-[#CBCCC9]">
    <div class="flex items-center gap-2 border-b border-[#CBCCC9] px-3.5 py-1.5">
      <div class="h-1.5 w-1.5 rounded-full bg-[#CBCCC9]"></div>
      <span class="text-[11px] text-[#888888]">{targetLabel}</span>
      <div class="flex-1"></div>
    </div>
    <div class="flex-1 overflow-auto p-3.5">
      <p class="font-mono text-sm leading-relaxed text-[#1A1A1A]">{@html targetText}</p>
    </div>
  </section>
</div>
