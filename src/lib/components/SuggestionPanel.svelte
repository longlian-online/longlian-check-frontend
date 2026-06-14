<script lang="ts">
  import { PanelRightClose } from "lucide-svelte";

  interface Suggestion {
    word: string;
    reason: string;
  }

  let {
    title = "AI 翻译建议",
    subtitle = "",
    suggestions = [],
  }: {
    title?: string;
    subtitle?: string;
    suggestions?: Suggestion[];
  } = $props();

  let count = $derived(suggestions.length);
</script>

<aside class="flex w-[280px] shrink-0 flex-col">
  <div class="flex items-center gap-2 border-b border-[#CBCCC9] px-3.5 py-2">
    <span class="text-xs font-semibold text-[#1A1A1A]">{title}{subtitle ? ` · ${subtitle}` : ""}</span>
    <div class="flex-1"></div>
    <span class="text-[11px] text-[#888888]">{count} 条</span>
    <PanelRightClose class="h-5 w-5 text-[#888888]" />
  </div>
  <div class="flex flex-1 flex-col gap-1.5 overflow-auto p-2">
    {#each suggestions as sug}
      <div class="rounded-sm border border-[#CBCCC9] p-2.5">
        <p class="text-sm font-semibold text-[#1A1A1A]">{sug.word}</p>
        <p class="text-[11px] text-[#888888]">{sug.reason}</p>
        <div class="mt-1 flex items-center gap-1.5">
          <span class="rounded-sm bg-[#1A1A1A] px-2.5 py-0.5 text-[11px] text-white">采纳</span>
          <span class="rounded-sm border border-[#CBCCC9] px-2.5 py-0.5 text-[11px] text-[#1A1A1A]">复制</span>
        </div>
      </div>
    {/each}
  </div>
</aside>
