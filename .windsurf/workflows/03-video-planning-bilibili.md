---
description: B站视听策划 - 读取上游故事大纲与 tutorial.final.md（口播内容真相源），自动生成 Remotion 组件映射、Props 接口、动画 Cue、录屏 zoom 指令，完成从"故事 + 必讲要点"到"可执行视频蓝图"的技术编排。
---

<!-- AUTO-GENERATED from shared/workflows/03-video-planning-bilibili.md. Do not edit here; edit the source and run `python scripts/sync_workflows.py`. -->

# B站视听策划 Workflow (03-video-planning-bilibili)

本工作流由【视听策划师】全自动执行，用于连接**故事大纲（02）**与**脚本撰写（04）**，将抽象的视觉意图翻译为可执行的 Remotion 技术规格。

---

## 前置依赖

本工作流假设已完成 `/02-content-planning`，已具备：
- 处于 `approved` 状态的 `content-library/<epNN-slug>/02-plan/README.md`
- 定稿的故事大纲（含 `outline_sections` 与 `demo_design`）
- **处于 `approved` 状态的 `content-library/<epNN-slug>/02-plan/tutorial.final.md`**（人工修订定稿的教学软文，口播内容真相源，含末尾「必讲要点覆盖清单」）
- **必须读取组件说明书**：`shared/docs/remotion-spec.md`（定义了可用的组件和动画限制）

如果缺失，请提示用户先执行或通过 `/02-content-planning`。

> ❗ **关键前提**：`tutorial.final.md` 必须已被人工修订并置 `status: approved`，否则下游编排缺少"必讲要点"真相源，禁止继续。

---

## 步骤

### 1. 加载角色定义

读取 `shared/roles/content/visual-planner(视听策划师).md` 文件，理解视听策划师的定位与全自动编排协议。

### 2. 加载上游资产、内容真相源与组件库规格

读取以下文件，为自动编排提供完整输入：
- `content-library/<epNN-slug>/02-plan/README.md`（已定稿的故事大纲与分镜结构）
- `content-library/<epNN-slug>/02-plan/tutorial.final.md`（口播内容真相源，含「必讲要点覆盖清单」）
- `shared/docs/remotion-spec.md`（Remotion 组件库规格）

如果上游资产不是 `approved` 状态（README.md 或 tutorial.final.md 任一缺失/未 approved），请明确提示用户。

### 3. 解析与组件映射 (AI 自动)

1. 解析 `02-plan/README.md` 中的 `outline_sections`，提取每个 section 的 `scene_template` 抽象描述。
2. 提取 `tutorial.final.md` 末尾的「必讲要点覆盖清单」，作为后续 Props 填充与覆盖度自检的基准。
3. 对照 `remotion-spec.md`，执行组件匹配决策：
   - 若现有组件可表达（如 `@IntroScene`, `@TableScene`, `@TimelineScene`）→ 复用。
   - 若无法表达 → 声明新 `Template Ticket`。
4. 为每个 section 生成 Props 填充策略与动画 Cue 表。Props 中的文案/数据须对齐 `tutorial.final.md` 的实际内容（如对比矩阵数据、选型理由、实操示例等），确保画面承载的信息与口播真相源一致。
5. **防静止编排（Anti-Deadtime）**：对每个 section 估算 `duration_seconds`，凡 > 15 秒者，必须二选一——(a) 配套约每 10–15 秒至少 1 个可见变化的 `animation_cues` 并覆盖到 scene 末尾；或 (b) 拆成多个子镜头（可选字段 `sub_shots` 或多个 `scene_storyboard`，每段 ≤15 秒）。详见 `shared/docs/remotion-spec.md` §1.5。
6. **黄金 3-5 秒钩子（Gold 3-5s Hook Rule，开场分镜硬性约束）**：开场第一个分镜（如 `@IntroScene`）必须在前 3-5 秒内通过“极速视觉切换 + 结果先行”瞬间锁住注意力（如：左改一行配置、右一秒渲染出片的双画面）。严禁在前 15 秒内使用单一、缓慢渐显的静态标题或无实质内容的纯粒子背景；`sub_shots[0]` 必须是高冲击力的实质画面。
7. **受众对齐与术语专业化（硬性约束）**：
   - **受众定位**：本频道受众为 AI 开发者 / 独立开发者 / 技术内容创作者，**大多不是传统视频制作者**。禁止用“传统剪辑拖时间轴 / 手动对字幕”等面向剪辑师的痛点做对比；改用开发者能共鸣的工程心智模型（如“手工时序 vs 声明式配置”“改配置即改片”），把省下的时间全用来强调本期实际技术内容。
   - **术语专业化**：`@TableScene` 判断层矩阵列名与描述用严谨、正式的工程术语，统一为 `["技术路线","适用场景","局限条件","关键约束"]`；避免“报菜名、逼 AI 吐出不适用+坑、复制粘贴/土办法”等口语、略粗俗的表达。

### 4. 生成 B 轨录屏指令 (AI 自动)

针对 `demo_design` 与包含 B 轨的 section：
1. 分析录屏片段中的关键 UI 区域。
2. 生成 `zoom_crop_directives`（clip_id, 时间戳, zoom_level, focal_point）。

### 5. 输出视听编排蓝图

整合以上产物，生成完整的 `03-plan-bilibili/README.md`，结构按 `visual-planner` 角色定义的【输出格式】执行。

末尾必须附带符合 `shared/schemas/03-plan-bilibili.schema.json` 的 ` ```json ` 结构化校验块。

### 6. 流程质量自检与 Schema 校验

输出前自检：
- ❌ **组件覆盖度自检**：每个 section 是否都映射到了具体组件或 Ticket？（禁止留下未解决的抽象描述）
- ❌ **必讲要点覆盖度自检**：逐条核对 `tutorial.final.md` 末尾的「必讲要点覆盖清单」，确认每个要点都有对应的 scene/组件承载。若有遗漏，须补充对应 scene 或在已有 scene 的 Props/动画中体现，不允许丢失必讲要点。
- ❌ **防静止自检**：是否存在 `duration_seconds > 15` 却既无足量 `animation_cues`（约每 10–15s 一个变化）又未拆 `sub_shots` 的 scene？若有，补 cue 或拆子镜头（见 `shared/docs/remotion-spec.md` §1.5）。
- ❌ **黄金 3-5 秒钩子自检**：开场第一个 scene 的 `sub_shots[0]` / 首个 `animation_cue` 是否在 5 秒内呈现高冲击力的实质画面（结果先行 / 极速切换）？是否误用了缓慢渐显的静态标题或纯粒子背景占满前 15 秒？
- ❌ **受众对齐与术语自检**：是否出现面向传统剪辑师的痛点对比（传统剪辑/拖时间轴/手动对字幕）？判断层矩阵列名与描述是否使用了严谨工程术语（适用场景/局限条件/关键约束）而非口语化的“不适用+坑/报菜名/土办法”？
- ❌ **Schema 机器校验**：模拟校验 JSON 结构块。后续自动化可执行：
  ```bash
  # 校验视听编排蓝图是否符合 03-plan-bilibili 规范
  npx ajv validate -s shared/schemas/03-plan-bilibili.schema.json -d content-library/<epNN-slug>/03-plan-bilibili/README.md
  ```

### 7. 落盘归档与状态变更

- 将上述蓝图写入：`content-library/<epNN-slug>/03-plan-bilibili/README.md`。
- 头部 frontmatter 置 `status: draft`（待人工评审通过后方可改为 `approved`）。
- 更新 `content-library/PIPELINE.md` 看板：该期 03 B站视听列置为 `draft`。

### 8. ~~触发判断层评审门 (Review Gate)~~ ⏸️ 已挂起（暂停使用）

> ⚠️ **判断层评审门已挂起**：判断层评审（CHAI 质量门）已暂时从流程中移除，本阶段无需调用 `/meta/judgment-layer(判断层评审)`。
> 完成 Schema 校验并自查无误后，可直接将 `content-library/PIPELINE.md` 看板中该期 03 B站视听列置为 `approved`，然后执行 `/04-script-draft` 进入脚本撰写阶段。
> 恢复方法：删除本节的"已挂起"标记与本提示，并取消下方注释块的注释即可还原评审门。

<!-- 判断层评审门（已挂起，恢复时取消本块注释）
提示用户：
> “B站视听编排蓝图已落盘归档至 `03-plan-bilibili/README.md` 并生成了结构化校验块。
> 请通过调用 `/meta/judgment-layer(判断层评审)` 对本产物进行 CHAI 规则质量评审。
> 评审通过且看板标为 `approved` 后，可执行 `/04-script-draft` 进入脚本撰写阶段。”
-->


---

## 关联文件

- 角色：`shared/roles/content/visual-planner(视听策划师).md`
- 上游：`02-content-planning.md`
- 内容真相源：`content-library/<epNN-slug>/02-plan/tutorial.final.md`
- 下游：`04-script-draft.md`
