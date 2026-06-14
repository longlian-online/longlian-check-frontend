<script lang="ts">
  import { ChevronDown } from "lucide-svelte";

  let suggestionCount = $state("4");
  let showReason = $state(true);
  let dataCollection = $state(false);
</script>

<div class="flex flex-1 flex-col gap-6 overflow-auto px-6 py-5">
  <!-- AI 建议 -->
  <div class="flex flex-col">
    <div class="flex items-center border-b border-[#CBCCC9] pb-1.5">
      <span class="text-xs font-semibold tracking-wider text-[#888888]">AI 建议</span>
    </div>
    <div class="flex items-center justify-between px-0 py-2">
      <div class="flex flex-col gap-0.5">
        <span class="text-sm text-[#1A1A1A]">翻译建议数量</span>
        <span class="text-[11px] text-[#888888]">AI 每次返回的建议数 (2–8)</span>
      </div>
      <div class="flex items-center gap-1.5 rounded-sm border border-[#CBCCC9] px-2.5 py-1">
        <span class="text-sm text-[#1A1A1A]">{suggestionCount}</span>
        <ChevronDown class="h-3 w-3 text-[#888888]" />
      </div>
    </div>
    <div class="flex items-center justify-between px-0 py-2">
      <div class="flex flex-col gap-0.5">
        <span class="text-sm text-[#1A1A1A]">显示采纳原因</span>
        <span class="text-[11px] text-[#888888]">展示 AI 推荐每条建议的理由</span>
      </div>
      <button
        aria-label={showReason ? "关闭显示采纳原因" : "开启显示采纳原因"}
        class="relative h-5 w-9 cursor-pointer rounded-full {showReason ? 'bg-[#1A1A1A]' : 'bg-[#CBCCC9]'} transition-colors"
        onclick={() => (showReason = !showReason)}
      >
        <div
          class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform {showReason ? 'translate-x-[18px]' : 'translate-x-[2px]'}"
        ></div>
      </button>
    </div>
  </div>

  <!-- 隐私与数据 -->
  <div class="flex flex-col">
    <div class="flex items-center border-b border-[#CBCCC9] pb-1.5">
      <span class="text-xs font-semibold tracking-wider text-[#888888]">隐私与数据</span>
    </div>
    <div class="flex items-center justify-between px-0 py-2">
      <div class="flex flex-col gap-0.5">
        <span class="text-sm text-[#1A1A1A]">数据采集</span>
        <span class="text-[11px] text-[#888888]">上报采纳/拒绝数据以优化 AI 服务</span>
      </div>
      <button
        aria-label={dataCollection ? "关闭数据采集" : "开启数据采集"}
        class="relative h-5 w-9 cursor-pointer rounded-full {dataCollection ? 'bg-[#1A1A1A]' : 'bg-[#CBCCC9]'} transition-colors"
        onclick={() => (dataCollection = !dataCollection)}
      >
        <div
          class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform {dataCollection ? 'translate-x-[18px]' : 'translate-x-[2px]'}"
        ></div>
      </button>
    </div>
  </div>

  <!-- 工作目录 -->
  <div class="flex flex-col">
    <div class="flex items-center border-b border-[#CBCCC9] pb-1.5">
      <span class="text-xs font-semibold tracking-wider text-[#888888]">工作目录</span>
    </div>
    <div class="flex items-center justify-between px-0 py-2">
      <div class="flex flex-col gap-0.5">
        <span class="font-mono text-sm text-[#1A1A1A]">~/Documents/暮译/</span>
        <span class="text-[11px] text-[#888888]">项目、术语库等所有资源将保存在此目录</span>
      </div>
      <button class="cursor-pointer rounded-sm border border-[#CBCCC9] px-3 py-1 text-sm text-[#1A1A1A]">
        更改…
      </button>
    </div>
  </div>
</div>
