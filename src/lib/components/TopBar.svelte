<script lang="ts">
  import { BookOpen } from "lucide-svelte";

  const tabs = ["翻译模式", "校对模式", "术语库"];

  let { activeTab = "翻译模式" }: { activeTab?: string } = $props();
</script>

<header class="flex h-[52px] shrink-0 items-center gap-4 border-b bg-[#F7F8FA] px-4">
  <div class="flex items-center gap-3">
    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4A9FD8]">
      <BookOpen class="h-4 w-4 text-white" />
    </div>
    <span class="text-base font-bold">暮译</span>
  </div>
  <div class="flex-1"></div>
  <nav class="flex items-center">
    {#each tabs as tab}
      {#if tab === activeTab}
        <div class="rounded-t-lg border border-b-0 border-[#CBCCC9] bg-[#F2F3F0] px-3.5 py-1.5 text-sm font-medium">
          {tab}
        </div>
      {:else}
        <div class="px-3.5 py-1.5 text-sm text-[#888888]">{tab}</div>
      {/if}
    {/each}
  </nav>
</header>
