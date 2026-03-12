

## 修复 OpenClaw 页面下拉框文字对比度问题

**问题**: `SelectContent` 使用深色背景 `bg-[#0d1f3c]`，但 `SelectItem` 没有设置白色文字，导致深色文字在深色背景上不可见。

**修复范围**: 3 个文件中所有 `SelectContent` 和 `SelectItem`

| 文件 | 修改内容 |
|------|----------|
| `src/components/openclaw/TalentMarket.tsx` | 3 个 Select：为 `SelectContent` 添加 `text-white`，为每个 `SelectItem` 添加 `text-white/90 focus:bg-white/10 focus:text-white` |
| `src/components/openclaw/BreederDashboard.tsx` | 3 个 Select（型号/RAM/存储）：同上处理 |
| `src/components/openclaw/OpenClawListingForm.tsx` | 原生 `<select>` 和 `<option>` 元素添加 `text-white` |

统一样式：
- `SelectContent`: `bg-[#0d1f3c] border-white/10 text-white`
- `SelectItem`: `text-white/90 focus:bg-white/10 focus:text-white`

