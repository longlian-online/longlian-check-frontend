<script lang="ts">
  import { cn } from "$lib/utils";
  import { PanelLeftClose, Folder, Settings } from "lucide-svelte";

  interface Chapter {
    label: string;
    active?: boolean;
  }

  let {
    chapters = [],
    projectName = "暮居池·小说翻译",
  }: { chapters?: Chapter[]; projectName?: string } = $props();
</script>

<aside class="flex w-64 shrink-0 flex-col bg-[#F7F8FA]">
  <div class="flex items-center justify-between px-3 py-2.5">
    <span class="text-[11px] font-semibold uppercase tracking-wider text-[#888888]">项目</span>
    <PanelLeftClose class="h-4 w-4 text-[#888888]" />
  </div>
  <div class="flex items-center gap-2 bg-[#E7E8E5] px-3 py-1.5">
    <Folder class="h-4 w-4 text-[#1A1A1A]" />
    <span class="text-sm font-medium">{projectName}</span>
  </div>
  {#each chapters as chapter}
    <div class={cn("px-3 py-1", chapter.active && "bg-[#E7E8E5]")}>
      <span class={cn("text-sm", chapter.active ? "text-[#1A1A1A]" : "text-[#888888]")}>
        {chapter.label}
      </span>
    </div>
  {/each}
  <div class="flex-1"></div>
  <div class="flex items-center gap-1.5 px-3 py-2">
    <Settings class="h-4 w-4 text-[#666666]" />
    <span class="text-sm text-[#666666]">设置</span>
  </div>
</aside>
