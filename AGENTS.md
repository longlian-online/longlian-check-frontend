# 前端

longlian-check 的子模块。完整仓库指引见根目录 `AGENTS.md`。

**常用命令：**
```
bun run dev       # 开发服务器
bun run check     # 类型检查（svelte-check）
bun run build     # 生产构建
bun run format    # prettier 格式化
```

**要点：**
- Svelte 5 runes 模式，Tailwind v4
- `$lib/utils.ts` 提供 `cn()`（clsx + tailwind-merge）
- `$lib/components/` — 所有组件单文件
- 图标用 `lucide-svelte`
- 页面层管理 4 模式状态，通过 callback 向下传
