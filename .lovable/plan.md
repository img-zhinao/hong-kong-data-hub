

## 在育种者仪表盘增加 AI 员工编制输入

**问题**: 当前表单中 "AI 员工配置" 区域只有军团名称、运行天数和价格，缺少 AI 员工名单输入。提交时 `employees` 字段被硬编码为 `['BossAgent']`，导致详情页显示的员工编制不准确。

**方案**: 在"军团名称"下方、"已运行天数"上方增加一个员工输入框，用逗号分隔输入多个员工名称。

### 修改文件

**`src/components/openclaw/BreederDashboard.tsx`**

1. 在"军团名称"输入框后新增一个输入框：
   - Label: `AI 员工编制`
   - Placeholder: `例：BossAgent, DataMiner, ContentWriter`
   - 提示文字说明用逗号分隔
2. 提交逻辑中将输入值按逗号拆分为数组，替换硬编码的 `['BossAgent']`

