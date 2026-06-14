<script lang="ts">
  import { Search, Plus, Upload, Download } from "lucide-svelte";

  interface TermEntry {
    source: string;
    target: string;
  }

  let {
    projectName = "暮居池·小说翻译",
    entries = [],
  }: {
    projectName?: string;
    entries?: TermEntry[];
  } = $props();

  let searchQuery = $state("");

  let filtered = $derived(
    searchQuery
      ? entries.filter(
          (e) =>
            e.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.target.includes(searchQuery),
        )
      : entries,
  );
</script>

<div class="flex flex-1 flex-col gap-4 overflow-auto bg-[#F7F8FA] p-4">
  <!-- Toolbar -->
  <div class="flex shrink-0 items-center gap-3">
    <h1 class="text-lg font-bold text-[#1A1A1A]">术语库 · {projectName}</h1>
    <div class="flex-1"></div>
    <div class="relative">
      <Search class="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#888888]" />
      <input
        class="h-8 w-60 rounded-sm border border-[#CBCCC9] bg-white py-1 pl-7 pr-2.5 text-sm text-[#1A1A1A] outline-none"
        placeholder="搜索术语..."
        bind:value={searchQuery}
      />
    </div>
    <button class="flex cursor-pointer items-center gap-1 rounded-sm bg-[#1A1A1A] px-3 py-1.5 text-sm text-white">
      <Plus class="h-3.5 w-3.5" />
      <span>新建术语</span>
    </button>
    <button class="flex cursor-pointer items-center gap-1 rounded-sm border border-[#CBCCC9] bg-white px-3 py-1.5 text-sm text-[#1A1A1A]">
      <Upload class="h-3.5 w-3.5" />
      <span>导入</span>
    </button>
    <button class="flex cursor-pointer items-center gap-1 rounded-sm border border-[#CBCCC9] bg-white px-3 py-1.5 text-sm text-[#1A1A1A]">
      <Download class="h-3.5 w-3.5" />
      <span>导出</span>
    </button>
  </div>

  <!-- Table Card -->
  <div class="flex flex-1 overflow-hidden rounded-xl border border-[#E5E5E5] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
    <table class="w-full border-collapse">
      <thead>
        <tr class="h-11 border-b border-[#E5E5E5]">
          <th class="px-4 text-left text-sm font-semibold text-[#1A1A1A]">术语</th>
          <th class="px-4 text-left text-sm font-semibold text-[#1A1A1A]">译文</th>
        </tr>
      </thead>
      <tbody>
        {#each filtered as entry}
          <tr class="border-b border-[#E5E5E5] last:border-b-0">
            <td class="px-4 py-2.5 font-mono text-sm text-[#1A1A1A]">{entry.source}</td>
            <td class="px-4 py-2.5 font-mono text-sm text-[#1A1A1A]">{entry.target}</td>
          </tr>
        {/each}
        {#if filtered.length === 0}
          <tr>
            <td class="px-4 py-8 text-center text-sm text-[#888888]" colspan="2">
              无匹配术语
            </td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
