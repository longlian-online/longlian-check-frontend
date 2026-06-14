<script lang="ts">
  import { PanelRightClose } from "lucide-svelte";

  interface Suggestion {
    word: string;
    reason: string;
  }

  interface ProofreadSuggestion {
    label: string;
    reason: string;
  }

  type SugItem = Suggestion | ProofreadSuggestion;

  let {
    title = "AI 翻译建议",
    subtitle = "",
    suggestions = [],
    mode = "translation",
    onadopt,
    oncopy,
    onignore,
  }: {
    title?: string;
    subtitle?: string;
    suggestions?: SugItem[];
    mode?: "translation" | "proofreading";
    onadopt?: (index: number) => void;
    oncopy?: (index: number) => void;
    onignore?: (index: number) => void;
  } = $props();

  let count = $derived(suggestions.length);

  let adopted = $state<Set<number>>(new Set());
  let ignored = $state<Set<number>>(new Set());

  function handleAdopt(i: number) {
    adopted.add(i);
    adopted = new Set(adopted);
    onadopt?.(i);
  }

  function handleCopy(i: number) {
    oncopy?.(i);
  }

  function handleIgnore(i: number) {
    ignored.add(i);
    ignored = new Set(ignored);
    onignore?.(i);
  }
</script>

<aside class="flex w-[280px] shrink-0 flex-col">
  <div class="flex items-center gap-2 border-b border-[#CBCCC9] px-3.5 py-2">
    <span class="text-xs font-semibold text-[#1A1A1A]">{title}{subtitle ? ` · ${subtitle}` : ""}</span>
    <div class="flex-1"></div>
    <span class="text-[11px] text-[#888888]">{count} 条</span>
    <PanelRightClose class="h-5 w-5 text-[#888888]" />
  </div>
  <div class="flex flex-1 flex-col gap-1.5 overflow-auto p-2">
    {#each suggestions as sug, i}
      <div
        class="rounded-sm border px-2.5 py-2 {adopted.has(i)
          ? 'border-green-300 bg-green-50 opacity-60'
          : ignored.has(i)
            ? 'border-gray-200 bg-gray-50 opacity-50'
            : 'border-[#CBCCC9]'}"
      >
        {#if "word" in sug}
          <p class="text-sm font-semibold text-[#1A1A1A]">{(sug as Suggestion).word}</p>
        {:else}
          <p class="text-xs text-[#888888]">{(sug as ProofreadSuggestion).label}</p>
        {/if}
        <p class="text-[11px] text-[#888888]">{sug.reason}</p>
        <div class="mt-1 flex items-center gap-1.5">
          {#if !adopted.has(i) && !ignored.has(i)}
            <button
              class="cursor-pointer rounded-sm bg-[#1A1A1A] px-2.5 py-0.5 text-[11px] text-white"
              onclick={() => handleAdopt(i)}
            >
              {mode === "translation" ? "采纳" : "采纳"}
            </button>
            {#if mode === "translation"}
              <button
                class="cursor-pointer rounded-sm border border-[#CBCCC9] px-2.5 py-0.5 text-[11px] text-[#1A1A1A]"
                onclick={() => handleCopy(i)}
              >
                复制
              </button>
            {:else}
              <button
                class="cursor-pointer rounded-sm border border-[#CBCCC9] px-2.5 py-0.5 text-[11px] text-[#1A1A1A]"
                onclick={() => handleIgnore(i)}
              >
                忽略
              </button>
            {/if}
          {:else if adopted.has(i)}
            <span class="text-[11px] text-green-600">已采纳</span>
          {:else}
            <span class="text-[11px] text-gray-400">已忽略</span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</aside>
