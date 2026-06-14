<script lang="ts">
  let {
    suggestionCount = 0,
    chatCount = 0,
    cursorPos = "行 1, 列 1",
    autoSaveLabel = "已自动保存",
  }: {
    suggestionCount?: number;
    chatCount?: number;
    cursorPos?: string;
    autoSaveLabel?: string;
  } = $props();
</script>

<footer class="flex h-8 shrink-0 items-center justify-between border-t bg-[#F7F8FA] px-4">
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-1 rounded-full bg-white px-2 py-0.5">
      <span class="text-[11px] text-[#666666]">建议</span>
      {#if suggestionCount > 0}
        <span class="rounded-full bg-[#E7E8E5] px-1.5 py-[1px] text-[10px] text-[#1A1A1A]">{suggestionCount}</span>
      {/if}
    </div>
    <div class="flex items-center gap-1 rounded-full bg-white px-2 py-0.5">
      <span class="text-[11px] text-[#666666]">对话历史</span>
      {#if chatCount > 0}
        <span class="rounded-full bg-[#E7E8E5] px-1.5 py-[1px] text-[10px] text-[#1A1A1A]">{chatCount}</span>
      {/if}
    </div>
    <span class="text-[11px] text-[#888888]">{autoSaveLabel}</span>
  </div>
  {#if cursorPos}
    <span class="font-mono text-[11px] text-[#666666]">{cursorPos}</span>
  {/if}
</footer>
