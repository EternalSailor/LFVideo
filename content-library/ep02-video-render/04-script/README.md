---
stage: 04-script
platform: bilibili
status: draft
source_workflow: /04-script-draft
upstream_inputs:
  - 02-plan/README.md (status: draft)
  - 02-plan/tutorial.final.md (status: draft)
  - 03-plan-bilibili/README.md (status: draft)
  - shared/docs/remotion-spec.md
---

> ⚠️ **重做版（对齐三段主线）**：本脚本已按 `tutorial.final.md` 的「教人用 Vibe Coding」三段主线重写——开场 → 找技术路径 → 技术选型 → 技术落地 → 总结，并逐段对齐 `03-plan-bilibili/README.md` 的 13 个 scene_storyboard。旧的「两步/选路线·搭引擎」框架已弃用（流程即代码/角色编排归 EP05/EP06）。上游 `tutorial.final.md` 当前为 `draft`，本稿随其一同待人工复核后再置 `approved`。

# ep02 视频脚本：《用 Vibe Coding 搭一套能自动出片的视频渲染引擎》

**总时长预估**：约 5 分 52 秒（352s）
**口播字数预估**：约 2100 字
**主线**：站在"没有前后端基础、用大白话指挥 AI（Vibe Coding）"的视角，讲三步——① 找技术路径（让 AI 罗列现成路线）；② 技术选型（对约束选定 Remotion）；③ 技术落地（驱动 Remotion 按配置出片）。
**反噱头纪律**：不以"多少行代码/百倍效率/一键生成"为卖点；SSR `window` 坑定位为"选这条路要付的税"。

---

## 第一段：【@IntroScene】开场钩子（0:00–0:30，30s）

- **[画面]** 调用 `@IntroScene`。参数 `title`="用 Vibe Coding 搭一套能自动出片的视频渲染引擎"，`subtitle`="《Vibe Coding 造一条自动化视频生产线》EP02 · 视频渲染"，`roadmap`=["① 探索技术路径", "② 严谨技术选型", "③ 自动化落地"]，`background`="particles"。
  - **[子镜头时间线]**（黄金 5 秒留存，极速视觉切换）：
    - 0s [双画面切入]：左边修改 JSON 配置文件（修改标题与文本内容），右边终端自动运行 `npx remotion render`，进度条 1 秒锁死、新视频一秒出片
    - 4s [代码结构演示]：画面展开 IDE，展示 JSON 配置文件中数据字段与渲染出的视频画面的动态对应映射，体现“改配置即改片”的声明式优势
    - 15s [主视觉渐显]：粒子背景渐显，主标题弹性入场（spring_scale）
    - 20s [副标题与路线图]：副标题淡入，三步路线图（探索路径、严谨选型、自动化落地）依次浮现并锁定
- **[口播]** 你有没有被这种事烦过：视频里改一个小数字，结果一堆地方要跟着手动改，改完还得整条重新跑一遍？我后来烦了，干脆把整条视频写成了代码——你看，改配置里这一行，回车，程序自己重新编译，新片一秒就出来了。整套渲染引擎我一行代码没手写，全是拿大白话指挥 AI 搭的，这就叫 Vibe Coding。这期就三步：让 AI 帮我找路、陪我选型、最后落地出片。先记住一句话——你负责说人话，AI 负责干脏活，没基础照样能抄。

---

## 第二段：【@ConceptScene】找技术路径·先让 AI 把路摆出来（共同内核）（0:30–0:45，15s）

- **[画面]** 调用 `@ConceptScene`。参数 `eyebrow`="找技术路径"，`title`="先让 AI 把'能把视频写成代码'的路都摆出来"，`items`=[{label:"INPUT", title:"用代码/数据描述画面"}, {label:"COMPILE", title:"程序编译成帧"}, {label:"OUTPUT", title:"合成视频"}]，`background`="gradient"。
  - **[子镜头时间线]**：0s eyebrow + 标题入场 → 3s 三步骤卡片 stagger 入场 → 7s 箭头依次连接 INPUT→COMPILE→OUTPUT → 11s 整体轻微脉冲强调"内核一样"。
- **[口播]** 先说第一步，找路。我没自己埋头啃文档——说实话那太累了——直接把选择题丢给 AI：想把视频写成代码、让程序自动出片，现在都有哪些现成的路子？AI 一摆出来我就发现，这些路子骨子里是一回事：拿代码描述画面、编译成一帧帧、再合成视频。就像做菜，菜谱写法五花八门，最后都得下锅。区别只在用什么语言、什么引擎。

---

## 第三段：【@ConceptScene】找技术路径·六条技术路线（0:45–1:20，35s）

- **[画面]** 调用 `@ConceptScene`（卡片阵列，6 张）。参数 `title`="AI 摆出的六条路线"，`items`=[{title:"网页渲染 · Remotion", desc:"React 组件+CSS，无头浏览器逐帧截图"}, {title:"Motion Canvas/Revideo", desc:"写函数描述动画时序"}, {title:"Manim", desc:"Python 描述几何/公式"}, {title:"MoviePy", desc:"Python 操作像素+FFmpeg"}, {title:"PixiJS/Cocos", desc:"Canvas 上逐帧画"}, {title:"FFmpeg+脚本", desc:"命令行合成"}]。
  - **[子镜头时间线]**：0s 标题入场 → 3s 前三条卡片 stagger 入场 → 15s 后三条卡片 stagger 入场 → 28s 高亮 Remotion 卡 → 32s 底部浮出"同一内核：把画面编译成帧"。
- **[口播]** AI 一口气给我摆了六条路。第一条网页渲染，代表选手是 Remotion，拿 React 组件加 CSS 写画面，再用无头浏览器一帧帧截图，复杂排版最拿手。第二条 Motion Canvas，写函数描述动画时序，适合做代码演示。第三条 Manim，用 Python 描述几何和公式，数学可视化的神器。第四条 MoviePy，Python 直接操作像素加 FFmpeg，简单拼接够用。第五条 PixiJS 这类画布引擎，在 Canvas 上逐帧画，做复杂粒子特效。第六条 FFmpeg 加脚本，命令行合成，批量转码、烧字幕很猛。名字听着各不一样，但你扒到底，全在干同一件事——把画面编译成帧。

---

## 第四段：【@TableScene + B 轨】技术选型·严谨权衡技术局限（1:20–2:15，55s）

- **[B 轨]** `@VideoSlot`：`[B 轨占位替换提醒：请用户补充 IDE 录屏 — 和 AI 对话深度分析每条技术路线的局限性与关键约束（clip_id=b-ide-route-pitfalls）]`，作为 A 轨判断层矩阵的过程性 cut-in。
- **[A 轨兜底]**（B 轨缺失时使用）调用 `@TableScene`。参数 `eyebrow`="对照技术约束做减法"，`title`="严谨分析技术路线局限性与关键约束"，`columns`=["技术路线","适用场景","局限条件","关键约束"]，`rows`=[["Remotion","前端栈、复杂网页排版、跨期模板复用","纯后台超长视频批处理","打包时读浏览器对象会崩；BUSL商业授权"],["Motion Canvas / Revideo","代码演示、精确时序动画设计","复杂企业级网页排版","技术生态规模较小，模板自攒成本高"],["Manim","数学、几何、算法可视化展示","常规 UI 排版、标准网页排版","学习曲线陡峭、排版弱、大场景渲染慢"],["MoviePy","纯 Python 简单拼贴、音轨自动闪避","复杂自适应布局、动态文字特效","排版繁琐、多层时重度消耗内存、难以缓存"],["PixiJS / Cocos","游戏类高性能粒子特效与交互动画","标准网页 UI 体系、自适应文字对齐","复杂多行文本排版与自适应计算繁琐"],["FFmpeg + 脚本","批量转码、底层音视频合并","高精度自定义动效、复杂页面排版","命令语法晦涩、调试与异常定位极度困难"]]，`highlight_row`=0，`highlight_column`=3。
  - **[子镜头时间线]**（口播 >15s，必填）：0s 表头淡入 → 5s 六行依次 stagger 入场（至 25s）→ 28s 高亮"关键约束"整列 → 38s B 轨 IDE 录屏切入 → 48s 高亮 Remotion 行 + 浮出"对照约束做减法"标记。
- **[口播]** 第二步，选型。这一步最容易翻车——你要是直接问 AI“哪个好”，它会跟个老好人似的，每个都夸一遍，听着都行，结果你还是不会选。所以光听它报名字没用，真正值钱的，是看清每条路“什么时候不好使”。我就反过来逼它：把每条路的适用场景、还有会咬人的坑，全给我列出来。整理出来就是这张表。Remotion 适合前端栈和复杂自适应排版，但它是 Node 打包、无头浏览器渲染，你要是在组件最外层直接读 window，打包阶段就当场崩给你看；而且它是 BUSL 商业授权。Motion Canvas 生态小，模板得自己一点点攒；Manim 排版弱、渲染慢；MoviePy 内存吃得凶、写自适应排版能把人写吐；PixiJS 光算个文字对齐就费老大劲；FFmpeg 命令跟天书一样，出了问题你都不知道从哪查。看清这些坑，我再对着自己的需求做减法。记住：让 AI 把信息铺平，拍板的事留给你自己。

---

## 第五段：【@ConceptScene】技术选型·回到约束，为什么选 Remotion（2:15–2:40，25s）

- **[画面]** 调用 `@ConceptScene`。参数 `eyebrow`="回到我自己的约束"，`title`="为什么是 Remotion"，`items`=[{label:"模板", title:"固定模板换数据就复用", desc:"改一处主题全系列生效", icon:"🏗️"}, {label:"AI", title:"让 AI 接手最稳", desc:"只填数据、套现成组件，最不容易出错", icon:"🤖"}, {label:"CLI", title:"一行命令就出片", desc:"npx remotion render 纯命令行", icon:"▶️"}, {label:"WEB", title:"网页生态现成可用", desc:"CSS/动效/图表库随手拿", icon:"🌐"}]，`background`="gradient"。
  - **[子镜头时间线]**：0s eyebrow+标题入场 → 3s 三条约束卡 stagger 入场 → 12s "Remotion 胜出"四点浮现 → 20s badge="决定性"强调"模板换数据复用"。
- **[口播]** 坑都看清了，最后回到我自己的需求拍板。我把三条要求摆给 AI：我要一期一个固定模板、换批数据就能批量出几十期；我要让 AI 自己改内容还不容易出错；我还要跨好多期都好维护。对着这三条一比，Remotion 明显赢了——它组件和数据是分开的，改一处、整个系列跟着变；每期只让 AI 填数据、套现成组件，最不容易翻车；一行命令就出片；网页那套生态随手就能拿来用。一句话：它最听 AI 的话，也最经得起我反复折腾。

---

## 第六段：【@SplitLayout + @ComparisonCard】技术选型·Remotion vs 拼装 HTML 方案（2:40–3:05，25s）

- **[画面]** 调用 `@SplitLayout`（`direction`="horizontal"，`ratio`=0.5）：
  - 左 `@ComparisonCard`：`title`="✅ Remotion 框架"，`points`=["工程化复用：改一处组件，全系列样式同步","AI 维护友好：结构强约束，AI 只填配置数据","可长期维护：多期视频后依然拥有良好扩展性"]，`status`="success"。
  - 右 `@ComparisonCard`：`title`="❌ 拼装 HTML 方案"，`points`=["维护成本高：无工程化复用，每期需单独拼接","结构易跑偏：无强类型约束，AI 发挥空间过大","难以长期维护：超过十期视频后维护将成为灾难"]，`status`="error"。
  - 下方代价条：`text`="局限与代价：React 栈，采用 BUSL 商业授权（规模化商用要付费）"。
  - **[子镜头时间线]**：0s 分屏 center-out 展开 → 5s 左侧三条 stagger入场 → 13s 右侧三条 stagger 入场 → 20s 底部代价条浮出 → 23s 左侧微放大（胜出方 1.03x）。
- **[口播]** 可能有人要问：那我直接拿 HTML 拼一拼不更省事？我俩摆一块儿比比。复用上，Remotion 改一个组件、全系列同步，手写拼接只能每期复制粘贴、越改越乱；跟 AI 配合上，Remotion 用 TS 把字段类型管得死死的，AI 只能老老实实填空，换成裸 HTML，它一放飞结构就跑偏；维护上，做到第十期，Remotion 还能轻松扩，手写拼接基本就是一场工程灾难。代价当然有——你得用 React 栈、还得接受 BUSL 授权。但前端这块正好让 AI 写、我把方向，反而把 Vibe Coding 的长处用满了。一句话：宁可前期立规矩，别后期擦屁股。

---

## 第七段：【@ConceptScene】技术落地①·一份配置，自动分发成画面（3:05–3:30，25s）

- **[画面]** 调用 `@ConceptScene`（流向图 + 组件清单）。参数 `eyebrow`="技术落地"，`title`="一份配置 → Explainer 按 type 分发 → 现成组件"，`items`=[{label:"comparison", title:"→ ComparisonCard 对比卡"}, {label:"terminal_scene", title:"→ 合成终端：逐行打字，不用真录屏"}, {label:"screenshot_scene", title:"→ 截图叠光标/点击/打字"}, {label:"charts", title:"→ 柱/线/饼图、KPI"}, {label:"ConceptScene/SplitLayout", title:"→ 概念图解/左右分屏"}]。
  - **[子镜头时间线]**：0s 流向图标题入场 → 4s "配置→Explainer→组件"箭头连通 → 12s type→组件清单 stagger 入场 → 20s 高亮 terminal_scene/screenshot_scene 旁标"不用真录屏"。
- **[口播]** 选型定了，进第三步，落地。好消息是，落地也不用你手写，就是跟 AI 一起把"配置"和"组件"对上。仓库里这台引擎叫 remotion-composer，干活特别直白：你写一份配置，告诉它这段画面长啥样，主程序 Explainer 就看配置里的 type 字段，自动去找对应组件来渲。type 写 comparison 就出对比卡，terminal_scene 是合成终端、逐行打字、不用真去录屏，screenshot_scene 把截图叠上光标，还有图表、概念图、分屏。这些都是现成通用件，照着填就能用。你要是想再多点辨识度，还能让 AI 在这之上扩一套自己品牌的组件库——不过那是另一个更大的话题，以后单开一期讲。就记一句：引擎认的是 type，你喂对 type 就行。

---

## 第八段：【@TerminalScene】技术落地①·配置即内容，让 AI 填字段（3:30–3:50，20s）

- **[画面]** 调用 `@TerminalScene`。参数 `title`="只写配置：一个 comparison"，`language`="jsonc"，`code`=`{\n  "type": "comparison",\n  "title": "手工时序 vs 声明式配置",\n  "leftLabel": "手工时序",  "leftValue": "手工调整图层位置，改一处全身受累",\n  "rightLabel": "声明式配置", "rightValue": "改一行配置，程序自动重新对位"\n}`。
  - **[子镜头时间线]**：0s 终端标题入场 → 3s config 逐行打字入场 → 12s 高亮 `"type": "comparison"` → 16s 右侧注释浮出"TS 给每个字段定死格式，填错即编译报错"。
- **[口播]** 重点来了，这是用 Vibe Coding 做视频最省心的一招——我从不让 AI 去发明新组件，只让它照着现成组件填配置。比方说我要一张对比卡，我就跟它说：左边写手工时序、右边写声明式配置，它吐出来的就是这么一段配置：type 填 comparison，标题、左右两栏的标签和内容填好，齐活。你看，我全程没碰代码，就动了动嘴。记住：别让 AI 造轮子，让它把轮子装上。

---

## 第九段：【@SplitLayout + B 轨】技术落地①·造组件 ❌ vs 填数据 ✅（3:50–4:15，25s）

- **[B 轨]** `@VideoSlot`：`[B 轨占位替换提醒：请用户补充 IDE 录屏 — 左：AI 从零手写 ComparisonScene.tsx（反面 ❌）；右：只写一份 data 喂给现成 @ComparisonCard（正面 ✅）（clip_id=b-ide-config-fill）]`。
- **[A 轨兜底]**（B 轨缺失时使用）调用 `@SplitLayout`：
  - 左 `@TerminalScene`：`title`="❌ 从零手写组件"，`language`="tsx"，`code`=`// 违反"数据与视图分离"，容易写出不可复用组件\nexport const ComparisonScene = () => {\n  // 手写布局/样式/动画，无视现成 @ComparisonCard\n  return <div className="custom">...</div>;\n};`。
  - 右 `@TerminalScene`：`title`="✅ 只填数据，复用现成组件"，`language`="ts"，`code`=`const comparison = {\n  left:  { title: '手工时序',   value: '手工调整图层位置' },\n  right: { title: '声明式配置', value: '改一行配置程序重对位' },\n};\n// <ComparisonCard {...comparison} /> — TS 字段类型兜底`。
  - **[子镜头时间线]**：0s 分屏入场 → 4s 左侧红标 ❌ 代码淡入 → 11s 右侧绿标 ✅ 数据淡入 → 16s 高亮右侧数据结构（或 B 轨录屏切入）→ 22s 正确方放大强调。
- **[口播]** 为啥这么干最稳？看左右对照。左边是反面教材——让 AI 给这一期从零手写个新组件，又是重复造轮子，又把换数据就能复用这个好处给弄丢了。右边才对——只产出一份数据，丢给现成组件去渲。最关键的是，Remotion 用 TypeScript 把每个 type 的字段格式都焊死了，AI 一旦填错、漏填，编译当场就报红给你看。它只能在画好的格子里填空，乱发挥的空间被压到最小。这就像考试给你发的是填空卷，而不是让你交白卷自由发挥——这正是没基础也能让它干得住的原因。

---

## 第十段：【@ScreenshotScene】技术落地②·数字主持人（基础版）（4:15–4:37，22s）

- **[画面]** 调用 `@ScreenshotScene`（VRMAvatar 取景预设示意 + 三处 callout）。参数 `title`="数字主持人 VRMAvatar：只做陪衬串场"，`callouts`=[{at:"取景", text:"整体渲一次，按场景裁半身/全身"}, {at:"脚踩稳", text:"在大腿上把髋部摆动反向抵消，脚踩原地"}, {at:"边界", text:"坚决不做对口型数字人、不做 AI 假界面"}]。
  - **[子镜头时间线]**：0s 主持人截图淡入 → 4s callout"取景预设"浮出 → 10s callout"脚踩稳（髋部反向抵消）"浮出 → 16s callout"反对口型边界"浮出。
- **[口播]** 引擎里还有个 3D 主持人 VRMAvatar，定位先说死：它只是陪衬串场，不是主角。整体渲一次，再按场景裁出半身、全身景别，不用每段重搭。之前它待机只摆髋部，整条腿带着脚像钟摆一样甩；修法是在大腿上把髋部摆动反向抵消掉，脚就老老实实踩原地了。还有条死规矩——坚决不做对口型的数字人、不做 AI 假界面，可信度这东西，只能靠真实录屏换。

---

## 第十一段：【@SplitLayout + B 轨】技术落地②·SSR 避坑，把规则写死交给 AI（4:37–5:12，35s）

- **[B 轨]** `@VideoSlot`：`[B 轨占位替换提醒：请用户补充 IDE 录屏 — 左：顶层读 window 触发 ReferenceError 红屏（clip_id=b-ide-ssr-crash）；右：加 typeof window 守卫 + 写入 .cursor/rules/remotion-ssr.mdc 后一次性渲出（clip_id=b-ide-ssr-fix）]`。
- **[A 轨兜底]**（B 轨缺失时使用）调用 `@SplitLayout`：
  - 左 `@TerminalScene`：`title`="❌ 打包阶段就崩"，`language`="tsx"，`code`=`// Remotion 打包跑在 Node 里，没有 window\nconst w = window.innerWidth;  // 💥\n// ReferenceError: window is not defined`。
  - 右 `@TerminalScene`：`title`="✅ 守卫 + 规则一次写死"，`language`="tsx"，`code`=`const getWidth = () =>\n  typeof window !== 'undefined' ? window.innerWidth : 1920;\n\n// .cursor/rules/remotion-ssr.mdc（globs: remotion-composer/src/**）\n// "组件顶层不得直接读 window/document"`。
  - **[子镜头时间线]**（口播 >15s，必填）：0s 分屏入场 → 4s 左侧崩溃代码/录屏淡入 → 12s 左侧震动强调 ReferenceError（3px shake）→ 20s 右侧 typeof 守卫代码/录屏淡入 → 28s 浮出 `.cursor/rules/remotion-ssr.mdc` → 32s 右侧 badge="一次通过"。
- **[口播]** 整个落地过程里，唯一让我反复栽跟头的，就是 SSR 这个坑。看左边：组件最外层直接读了 window，可 Remotion 打包那会儿是跑在 Node 里的、压根还没进浏览器，哪来的 window？当场就报个 ReferenceError、渲染红屏。这就好比人还没进屋，你就伸手去开灯——灯都还没装上，当然摸了个空。右边怎么修：加一句 typeof window 判断，是浏览器才读、不是就给个默认值。但更聪明的做法，不是每次都盯着 AI 提醒它，而是把这条规则一次性写死——塞进 .cursor/rules 一个 mdc 文件，指到引擎源码目录，往后 AI 生成组件自动就带上了，根本不用你盯。这就是 Vibe Coding 的精髓：重复的规矩，固化成规则交给 AI，别用嘴一遍遍念。

---

## 第十二段：【@TerminalScene + B 轨】技术落地②·一行命令出片（5:12–5:37，25s）

- **[B 轨]** `@VideoSlot`：`[B 轨占位替换提醒：可选 — 终端真实录屏 npx remotion render 执行并输出 MP4（clip_id=b-term-render）；有 A 轨兜底]`。
- **[A 轨兜底]**（B 轨缺失时使用）调用 `@TerminalScene`。参数 `title`="npx remotion render 出片"，`language`="bash"，`code`=`cd OpenMontage/remotion-composer\nnpx remotion studio                       # 可视化调试\nnpx remotion render src/index.ts \\\n  <CompositionId> out/ep02.mp4            # 渲染出片`。
  - **[子镜头时间线]**：0s 终端标题入场 → 4s 命令逐行打字 → 12s B 轨渲染录屏切入（或 A 轨模拟进度）→ 18s 进度条 0→100% 动画 → 23s 输出"✓ out/ep02.mp4"提示。
- **[口播]** 终于到出片了。这一步你既不用写代码、也不用背命令，让 AI 在终端里替你敲就行。cd 进 remotion-composer，npx remotion studio 拉起来可视化调试，npx remotion render 直接出片。全程纯命令行，往后想接自动化、想搬上云，都顺。具体那个 Composition 注册名是啥，录之前让 AI 跑一遍 studio 核对一下就好。一句话：能交给命令行的，就别用手。

---

## 第十三段：【@OutroScene】结尾 CTA（5:37–5:52，15s）

- **[画面]** 调用 `@OutroScene`。参数 `headline`="整期三步：找技术路径 + 技术选型 + 技术落地"，`cta`="关注 · 下期 EP03 字幕匹配：Whisper 让字幕踩着话音跳"，`background`="gradient"。
  - **[子镜头时间线]**：0s 总结三步淡入 → 5s "没基础也能复制"落点强调 → 9s CTA 下期 EP03 打字机逐字显现 → 12s 关注脉冲（绿色）。
- **[口播]** 回头看，其实就三步：找路，让 AI 把现成路线全摆出来；选型，让 AI 列坑、你对着自己的约束拍板；落地，填配置、套组件、规则兜底、AI 跑渲染。你真正要会的，从来不是写代码，而是把需求讲清楚、把坑看住、把规则固化给 AI——就这些，没基础也能照着抄。下期 EP03，我用 Whisper 让字幕踩着话音一个字一个字往外蹦。关注一下，别错过。

---

## 6. 自我检查清单

- ✅ B 站深度版完整产出（13 段，对齐 03 蓝图 13 个 scene_storyboard，约 2100 字、约 5 分 52 秒）
- ✅ **主线＝教人用 Vibe Coding**：开场结果先行 + 人设；每个技术段体现"人讲需求/看坑/定规则 + AI 写和填"；结尾落点"没基础也能复制"
- ✅ **去抽象腔**：全文未用"范式/换一套心智模型/帧即状态"等抽象标签，一律大白话
- ✅ **单期范围纪律**：流程即代码/角色（EP05/06）、字幕（EP03）、音频均未展开，仅结尾一句预告
- ✅ **必讲要点覆盖核对**：逐条对齐 `tutorial.final.md` 末尾清单，17/17 全覆盖（详见下方）
- ✅ 所有组件均为 `remotion-spec.md` 已有组件，无新组件工单（呼应"配置即内容、不造组件"）
- ✅ **A/B 轨兜底完整性**：S4/S9/S11/S12 含 B 轨 `@VideoSlot` 录屏指示 + A 轨 `@TableScene`/`@SplitLayout`/`@TerminalScene` 兜底
- ✅ 恶俗 AI 词汇检查：无"赋能、打造、革新、全方位、数字化浪潮"
- ✅ **防静止**：所有 >15s 段落均配 [子镜头时间线]，无静止画面超 15s

### 必讲要点覆盖核对

| # | 要点（tutorial.final.md 清单） | 脚本对应段落 | 状态 |
|---|------|------------|------|
| 1 | 痛点大白话：传统剪辑改一处要回时间轴重排 | 第一段 | ✅ |
| 2 | 结果先行：写成配置、改一行就重渲 | 第一段 | ✅ |
| 3 | 人设：没基础、全程 Vibe Coding（讲需求/AI 写/人判断） | 第一段 | ✅ |
| 4 | 本期路线图：找路径/选型/落地、没基础也能复制 | 第一段 | ✅ |
| 5 | 让 AI 摆出多条路线 + 共同内核（编译成帧） | 第二、三段 | ✅ |
| 6 | 开源对比：逼 AI 给"不适用+坑"，人盯坑做减法 | 第四段 | ✅ |
| 7 | 选型理由：回到自己约束 → 为什么 Remotion | 第五段 | ✅ |
| 8 | Remotion vs 复制粘贴 HTML 对照 + 代价（React 栈/BUSL） | 第六段 | ✅ |
| 9 | 引擎怎么干活：配置 → Explainer 按 type 分发到组件 | 第七段 | ✅ |
| 10 | 组件清单：comparison/terminal_scene/screenshot_scene/charts/ConceptScene·SplitLayout | 第七段 | ✅ |
| 11 | 配置即内容：让 AI 填字段别造组件、TS 类型兜底 | 第八、九段 | ✅ |
| 12 | 数字主持人（基础版）：陪衬/脚站稳/坚决不做对口型 | 第十段 | ✅ |
| 13 | 避坑：顶层读 window 打包阶段崩 → `.cursor/rules` 一次写死 | 第十一段 | ✅ |
| 14 | 出片就是一行 `npx remotion render`，交给 AI/终端跑 | 第十二段 | ✅ |
| 15 | 三步法回顾 + "没编程基础也能复制" | 第十三段 | ✅ |
| 16 | 关注引导 + 下期预告（EP03 字幕匹配：Whisper 驱动 CaptionOverlay） | 第十三段 | ✅ |
| 17 | 自有风格组件库：可在现成组件上扩品牌化模板，后续单独一期（一句带过） | 第七段 | ✅ |

---

## 7. 结构化校验块 (JSON Schema Block)

<!-- MANDATORY: 符合 shared/schemas/04-script.schema.json；本块是下游 TTS/组装/字幕/分发的唯一真源，approve 后冻结 -->
```json
{
  "title": "用 Vibe Coding 搭一套能自动出片的视频渲染引擎",
  "platform": "bilibili",
  "estimated_duration_seconds": 352,
  "total_word_count": 2100,
  "anti_hype_forbidden": ["多少行代码", "百倍", "千倍", "一键生成"],
  "sections": [
    {
      "id": "1",
      "section_ref": "开场钩子",
      "track": "A",
      "scene_template": "@IntroScene",
      "voice": "改个视频要多久？改配置里这一行字，重新跑一下，一秒钟，新片自动编译渲染，根本不用碰时间轴！传统剪辑最烦改，拖时间轴、重新对齐、改三轮人就废了。而我这套自动化生产线，没写过一行代码，全是让 AI 帮我搭的。这就是 Vibe Coding。这期视频分三步：先找技术路径，再做技术选型，最后技术落地。跟着走，没基础你也绝对能复制。",
      "visual_instructions": "@IntroScene：左改配置右渲染 1秒出片 → Premiere 痛苦剪辑时间轴 → 粒子背景渐显 + 主副标题与三步路线图依次浮现",
      "duration_hint_seconds": 30,
      "visual_beats": [
        {"at_seconds": 0, "action": "[双画面] 左改配置一行字，右终端 1秒进度条拉满、即刻出片"},
        {"at_seconds": 4, "action": "[痛点录屏] 切入 Premiere/剪映传统剪辑拖拽、对字幕痛苦画面"},
        {"at_seconds": 15, "action": "[主视觉] 粒子背景渐显，主标题弹性入场 spring_scale"},
        {"at_seconds": 20, "action": "[路线图] 副标题淡入，三步路线卡片依次浮现并锁定"}
      ]
    },
    {
      "id": "2",
      "section_ref": "找技术路径·让 AI 摆出多条路线（内核）",
      "track": "A",
      "scene_template": "@ConceptScene",
      "voice": "第一步，找技术路径。我没自己啃文档，是把选择题丢给 AI。我问它：想把视频写成代码、让程序自动出片，有哪些现成路线？这些路子内核都一样——用代码描述画面、编译成帧、合成视频，区别只在用什么语言、什么引擎。",
      "visual_instructions": "@ConceptScene：INPUT 描述画面 → COMPILE 编译成帧 → OUTPUT 合成视频，箭头连接",
      "duration_hint_seconds": 15,
      "visual_beats": [
        {"at_seconds": 0, "action": "eyebrow + 标题入场"},
        {"at_seconds": 3, "action": "三步骤卡片 stagger 入场"},
        {"at_seconds": 7, "action": "箭头连接 INPUT→COMPILE→OUTPUT"},
        {"at_seconds": 11, "action": "脉冲强调'内核一样'"}
      ]
    },
    {
      "id": "3",
      "section_ref": "找技术路径·六条技术路线",
      "track": "A",
      "scene_template": "@ConceptScene",
      "voice": "AI 给我摆出六条路。网页渲染，代表 Remotion，React 组件加 CSS，无头浏览器逐帧截图，适合复杂排版。Motion Canvas，写函数描述动画时序，适合代码演示。Manim，Python 描述几何公式，数学可视化神器。MoviePy，Python 操作像素加 FFmpeg，适合简单拼接。PixiJS 这类画布引擎，Canvas 上逐帧画，做复杂粒子。FFmpeg 加脚本，命令行合成，适合批量转码、字幕烧录。六条路描述层不同，但都通向同一件事——把画面编译成帧。",
      "visual_instructions": "@ConceptScene：六张路线卡片（Remotion/Motion Canvas/Manim/MoviePy/PixiJS/FFmpeg），各配描述方式+适合场景",
      "duration_hint_seconds": 35,
      "visual_beats": [
        {"at_seconds": 0, "action": "标题入场"},
        {"at_seconds": 3, "action": "前三条卡片 stagger 入场"},
        {"at_seconds": 15, "action": "后三条卡片 stagger 入场"},
        {"at_seconds": 28, "action": "高亮 Remotion 卡"},
        {"at_seconds": 32, "action": "浮出'同一内核：编译成帧'"}
      ]
    },
    {
      "id": "4",
      "section_ref": "技术选型·严谨权衡技术局限与边界",
      "track": "A+B",
      "scene_template": "@TableScene",
      "voice": "第二步，技术选型。光报菜名没有用，AI 默认给的百科式对比，每个都说好话，这无法帮你做工程选型。真正关键的，是看清各条路线的适用场景和技术局限。所以我追问了 AI，整理出了这份严谨的局限与约束对比。Remotion 适合前端技术栈和复杂的自适应排版，但由于它是 Node 打包、无头浏览器渲染，在组件最外层读 window 对象会在打包时崩掉，且采用的是 BUSL 商业授权。相比之下，Motion Canvas 生态较小，模板手攒成本高；Manim 排版能力偏弱、渲染慢；MoviePy 内存开销大、写自适应排版极繁琐；PixiJS 处理文字对齐计算量太大；而 FFmpeg 命令晦涩，难以高效调试。看清这些约束，我们就能对照自己的工程约束做减法，让 AI 铺平信息，我们来做最优解决策。",
      "visual_instructions": "B 轨：和 AI 深度分析技术路线局限的 IDE 录屏（b-ide-route-pitfalls）；A 轨兜底：@TableScene 六方案矩阵（适用场景/局限条件/关键约束），highlight_row=0、highlight_column=3",
      "duration_hint_seconds": 55,
      "b_track_required": true,
      "b_track_notes": "IDE 录屏：和 AI 追问每条技术路线的局限条件与关键约束",
      "visual_beats": [
        {"at_seconds": 0, "action": "表头淡入"},
        {"at_seconds": 5, "action": "六行依次 stagger 入场（至 25s）"},
        {"at_seconds": 28, "action": "高亮'关键约束'整列"},
        {"at_seconds": 38, "action": "B 轨 IDE 录屏切入"},
        {"at_seconds": 48, "action": "高亮 Remotion 行 + '对照约束做减法'标记"}
      ]
    },
    {
      "id": "5",
      "section_ref": "技术选型·回到约束为什么选 Remotion",
      "track": "A",
      "scene_template": "@ConceptScene",
      "voice": "坑看清了，最后回到我自己的需求拍板。我把约束讲给 AI：要一期一个固定模板、换数据就批量出几十期；要让 AI 自己改内容还不容易错；要跨好多期都好维护。对着这三条，Remotion 明显胜出——组件加数据分离，改一处全系列生效；每期只让 AI 填数据套现成组件，最不容易出错；一行命令就出片；网页生态随手能用。",
      "visual_instructions": "@ConceptScene：约束三条 → Remotion 胜出四点（模板/AI/CLI/网页生态），badge 决定性=数据分离",
      "duration_hint_seconds": 25,
      "visual_beats": [
        {"at_seconds": 0, "action": "eyebrow + 标题入场"},
        {"at_seconds": 3, "action": "三条约束卡 stagger 入场"},
        {"at_seconds": 12, "action": "Remotion 胜出四点浮现"},
        {"at_seconds": 20, "action": "badge='决定性'强调'模板换数据复用'"}
      ]
    },
    {
      "id": "6",
      "section_ref": "技术选型·Remotion vs 拼装 HTML 方案",
      "track": "A",
      "scene_template": "@SplitLayout",
      "voice": "为什么不直接用“直接拼装 HTML”这种简单方案？我们把 Remotion 和手写 HTML 拼接做个对比。模板复用上，Remotion 改一处组件全系列生效，手写拼接只能每期复制、越改越乱；让 AI 协作时，Remotion 的 TS 类型定义提供了极强的结构约束，AI 只能乖乖填数，而拼接 HTML 结构很容易跑偏；长期维护上，十期过后，Remotion 依然容易扩展，手写拼接就是工程灾难。虽然它的代价是需要 React 栈和 BUSL 授权，但前端这块有 AI 帮写、我们来把控方向，刚好发挥 Vibe Coding 的优势。",
      "visual_instructions": "@SplitLayout(@ComparisonCard 左✅Remotion / 右❌拼装 HTML，各三条) + 底部代价条（React/BUSL）",
      "duration_hint_seconds": 25,
      "visual_beats": [
        {"at_seconds": 0, "action": "分屏 center-out 展开"},
        {"at_seconds": 5, "action": "左侧三条 stagger 入场"},
        {"at_seconds": 13, "action": "右侧三条 stagger 入场"},
        {"at_seconds": 20, "action": "底部代价条浮出"},
        {"at_seconds": 23, "action": "左侧微放大 1.03x"}
      ]
    },
    {
      "id": "7",
      "section_ref": "技术落地①·配置分发",
      "track": "A",
      "scene_template": "@ConceptScene",
      "voice": "选型定了，第三步技术落地。好消息是，落地也不靠手写，靠跟 AI 一起把配置和组件对上。仓库里这台引擎叫 remotion-composer，干活特别直白：你写一份配置，告诉它这段画面长啥样，主程序 Explainer 就看配置里的 type 字段，自动去找对应组件来渲。type 写 comparison 就出对比卡，terminal_scene 是合成终端、逐行打字、不用真去录屏，screenshot_scene 把截图叠上光标，还有图表、概念图、分屏。这些都是现成通用件，照着填就能用。你要是想再多点辨识度，还能让 AI 在这之上扩一套自己品牌的组件库——不过那是另一个更大的话题，以后单开一期讲。就记一句：引擎认的是 type，你喂对 type 就行。",
      "visual_instructions": "@ConceptScene：流向图 配置 → Explainer 按 type 分发 → 组件；type→组件清单 stagger，标注 terminal/screenshot 不用真录屏",
      "duration_hint_seconds": 25,
      "visual_beats": [
        {"at_seconds": 0, "action": "流向图标题入场"},
        {"at_seconds": 4, "action": "配置→Explainer→组件 箭头连通"},
        {"at_seconds": 12, "action": "type→组件清单 stagger 入场"},
        {"at_seconds": 20, "action": "高亮 terminal_scene/screenshot_scene 标'不用真录屏'"}
      ]
    },
    {
      "id": "8",
      "section_ref": "技术落地①·配置即内容",
      "track": "A",
      "scene_template": "@TerminalScene",
      "voice": "重点来了，这是用 Vibe Coding 做视频最省心的地方——我不让 AI 发明新组件，只让它照现成组件填配置。比如要一个对比卡，我说“左边手工时序、右边声明式配置”，AI 产出的就是一段配置：type 写 comparison，把标题、左右两栏的标签和内容填好，完事。",
      "visual_instructions": "@TerminalScene：逐行打字展示一段 comparison 配置 JSON，高亮 type 字段 + 注释 TS 字段值兜底",
      "duration_hint_seconds": 20,
      "visual_beats": [
        {"at_seconds": 0, "action": "终端标题入场"},
        {"at_seconds": 3, "action": "config 逐行打字入场"},
        {"at_seconds": 12, "action": "高亮 \"type\": \"comparison\""},
        {"at_seconds": 16, "action": "注释浮出'TS 字段定死格式，填错即编译报错'"}
      ]
    },
    {
      "id": "9",
      "section_ref": "技术落地①·造组件 vs 填数据",
      "track": "A+B",
      "scene_template": "@SplitLayout",
      "voice": "为什么这么干最稳？看对照。左边反面——让 AI 为这期从零手写新组件，既重复造轮子，又把换数据就复用弄没了。右边正确——只产出一份数据，丢给现成组件渲。关键是 Remotion 用 TypeScript 给每个 type 的字段定死了格式，AI 填错漏填，编译立刻报错。它只能在固定格子里填空，乱发挥空间压到最小——这就是没基础也能让它干得住的原因。",
      "visual_instructions": "B 轨：IDE 录屏 从零手写❌ vs 只填数据✅（b-ide-config-fill）；A 轨兜底：@SplitLayout 左 @TerminalScene 手写组件代码 / 右 @TerminalScene data 对象",
      "duration_hint_seconds": 25,
      "b_track_required": true,
      "b_track_notes": "IDE 录屏：AI 从零手写组件 vs 只写 data 喂现成 @ComparisonCard",
      "visual_beats": [
        {"at_seconds": 0, "action": "分屏入场"},
        {"at_seconds": 4, "action": "左侧红标 ❌ 手写组件代码淡入"},
        {"at_seconds": 11, "action": "右侧绿标 ✅ data 数据淡入"},
        {"at_seconds": 16, "action": "高亮右侧数据结构（或 B 轨录屏切入）"},
        {"at_seconds": 22, "action": "正确方放大强调"}
      ]
    },
    {
      "id": "10",
      "section_ref": "技术落地②·数字主持人基础版",
      "track": "A",
      "scene_template": "@ScreenshotScene",
      "voice": "引擎里还有个 3D 主持人 VRMAvatar，定位先说死：它只是陪衬串场，不是主角。整体渲一次，再按场景裁出半身、全身景别，不用每段重搭。之前它待机只摆髋部，整条腿带着脚像钟摆一样甩；修法是在大腿上把髋部摆动反向抵消掉，脚就老老实实踩原地了。还有条死规矩——坚决不做对口型的数字人、不做 AI 假界面，可信度这东西，只能靠真实录屏换。",
      "visual_instructions": "@ScreenshotScene：VRMAvatar 取景预设 + 三处 callout（取景/脚踩稳·髋部反向抵消/反对口型边界）",
      "duration_hint_seconds": 22,
      "visual_beats": [
        {"at_seconds": 0, "action": "主持人截图淡入"},
        {"at_seconds": 4, "action": "callout '取景预设' 浮出"},
        {"at_seconds": 10, "action": "callout '脚踩稳（髋部反向抵消）' 浮出"},
        {"at_seconds": 16, "action": "callout '反对口型边界' 浮出"}
      ]
    },
    {
      "id": "11",
      "section_ref": "技术落地②·SSR 避坑",
      "track": "A+B",
      "scene_template": "@SplitLayout",
      "voice": "技术落地唯一反复踩的坑是 SSR。看左边：组件最外层直接读了 window，可 Remotion 打包阶段跑在 Node 里、还没进浏览器，没有 window 这对象，直接报 ReferenceError、渲染红屏。看右边怎么修：加个 typeof window 判断，是浏览器才读，不是就给默认值。更聪明的不是每次盯 AI，是把这条规则一次写死——写进 .cursor/rules 一份 mdc 文件，指向引擎源码目录，以后 AI 生成组件自动带上，不用人盯。这就是 Vibe Coding 的要点：重复的约束用规则固化交给 AI，别每次口头提醒。",
      "visual_instructions": "B 轨：window 崩溃→守卫修复 IDE 录屏（b-ide-ssr-crash/b-ide-ssr-fix）；A 轨兜底：@SplitLayout 左 ReferenceError 代码 / 右 typeof 守卫 + .cursor/rules/remotion-ssr.mdc",
      "duration_hint_seconds": 35,
      "b_track_required": true,
      "b_track_notes": "IDE 录屏：SSR window 崩溃 → typeof 守卫 → 写入 .cursor/rules/remotion-ssr.mdc 一次通过",
      "visual_beats": [
        {"at_seconds": 0, "action": "分屏入场"},
        {"at_seconds": 4, "action": "左侧崩溃代码/录屏淡入"},
        {"at_seconds": 12, "action": "左侧震动强调 ReferenceError"},
        {"at_seconds": 20, "action": "右侧 typeof 守卫代码/录屏淡入"},
        {"at_seconds": 28, "action": "浮出 .cursor/rules/remotion-ssr.mdc"},
        {"at_seconds": 32, "action": "右侧 badge='一次通过'"}
      ]
    },
    {
      "id": "12",
      "section_ref": "技术落地②·一行出片",
      "track": "A+B",
      "scene_template": "@TerminalScene",
      "voice": "到了出片，人不用写代码、不用背命令，让 AI 在终端里跑就行。cd 进 remotion-composer，npx remotion studio 可视化调试，npx remotion render 直接出片。纯命令行，以后接自动化、上云都方便。具体的 Composition 注册名，录制前让 AI 跑一次 studio 核对就好。",
      "visual_instructions": "B 轨：终端真实录屏 npx remotion render（b-term-render，可选）；A 轨兜底：@TerminalScene render 命令 + 模拟进度条",
      "duration_hint_seconds": 25,
      "b_track_required": false,
      "b_track_notes": "可选：终端真实录屏 npx remotion render 执行出片",
      "visual_beats": [
        {"at_seconds": 0, "action": "终端标题入场"},
        {"at_seconds": 4, "action": "命令逐行打字"},
        {"at_seconds": 12, "action": "B 轨渲染录屏切入或 A 轨模拟进度"},
        {"at_seconds": 18, "action": "进度条 0→100% 动画"},
        {"at_seconds": 23, "action": "输出 '✓ out/ep02.mp4' 提示"}
      ]
    },
    {
      "id": "13",
      "section_ref": "结尾 CTA",
      "track": "A",
      "scene_template": "@OutroScene",
      "voice": "回头看就三步：找技术路径，让 AI 把现成路线全摆出来；技术选型，让 AI 列坑、人对着约束拍板；技术落地，填配置、套组件、规则兜底、AI 跑渲染。你要会的不是写代码，是讲清需求、看住坑、把规则固化给 AI——没基础也能复制。下期 EP03，用 Whisper 让字幕踩着话音跳。关注别错过。",
      "visual_instructions": "@OutroScene：三步法总结 + '没基础也能复制' + CTA 下期 EP03 字幕匹配，打字机 + 脉冲",
      "duration_hint_seconds": 15,
      "visual_beats": [
        {"at_seconds": 0, "action": "总结三步淡入"},
        {"at_seconds": 5, "action": "'没基础也能复制' 落点强调"},
        {"at_seconds": 9, "action": "CTA 下期 EP03 打字机逐字"},
        {"at_seconds": 12, "action": "关注脉冲（绿色）"}
      ]
    }
  ],
  "judgment_layer_coverage": {
    "highlights_pitfall": true,
    "explains_boundary": true,
    "acceptance_standard": true,
    "ai_limitations_exposed": true
  },
  "b_track_assets_required": [
    {
      "clip_id": "b-ide-route-pitfalls",
      "description": "IDE 录屏：和 AI 对话追问每条技术路线的'不适用 + 已知坑'，人盯着坑做减法",
      "zoom_crop_directives": [
        {"timestamp_start": "0:00", "timestamp_end": "0:10", "zoom_level": 1.0, "description": "全貌：对话提问'每个方案什么情况不适用、有哪些坑'"},
        {"timestamp_start": "0:10", "timestamp_end": "0:20", "zoom_level": 1.3, "description": "聚焦：AI 回答里的'坑'列表"}
      ]
    },
    {
      "clip_id": "b-ide-config-fill",
      "description": "IDE 录屏：从零手写组件（反面 ❌）对照只写一份 data 喂现成 @ComparisonCard（正面 ✅）",
      "zoom_crop_directives": [
        {"timestamp_start": "0:00", "timestamp_end": "0:15", "zoom_level": 1.0, "description": "全貌：打开配置文件，准备填字段"},
        {"timestamp_start": "0:15", "timestamp_end": "0:25", "zoom_level": 1.4, "description": "聚焦：comparison 的 left/right 字段 + TS 报错提示"}
      ]
    },
    {
      "clip_id": "b-ide-ssr-crash",
      "description": "IDE 录屏：组件顶层读 window 触发 ReferenceError，渲染红屏",
      "zoom_crop_directives": [
        {"timestamp_start": "0:00", "timestamp_end": "0:12", "zoom_level": 1.5, "description": "聚焦终端：ReferenceError: window is not defined"}
      ]
    },
    {
      "clip_id": "b-ide-ssr-fix",
      "description": "IDE 录屏：加 typeof window 守卫 + 写入 .cursor/rules/remotion-ssr.mdc 后一次性渲出",
      "zoom_crop_directives": [
        {"timestamp_start": "0:00", "timestamp_end": "0:15", "zoom_level": 1.4, "description": "聚焦代码：typeof window 守卫 + mdc 规则文件"}
      ]
    },
    {
      "clip_id": "b-term-render",
      "description": "终端录屏：npx remotion render 执行并输出 MP4（可选，有 A 轨兜底）",
      "zoom_crop_directives": [
        {"timestamp_start": "0:00", "timestamp_end": "0:12", "zoom_level": 1.2, "description": "聚焦渲染进度条和帧计数"}
      ]
    }
  ],
  "coverage_checklist": {
    "total": 17,
    "covered": 17,
    "items": [
      {"id": 1, "point": "痛点大白话：传统剪辑改一处要回时间轴重排", "section": "1"},
      {"id": 2, "point": "结果先行：写成配置、改一行就重渲", "section": "1"},
      {"id": 3, "point": "人设：没基础、全程 Vibe Coding", "section": "1"},
      {"id": 4, "point": "本期路线图：找路径/选型/落地、没基础也能复制", "section": "1"},
      {"id": 5, "point": "让 AI 摆出多条路线 + 共同内核", "section": "2,3"},
      {"id": 6, "point": "逼 AI 给不适用+坑，人盯坑做减法", "section": "4"},
      {"id": 7, "point": "选型理由：回到约束 → 为什么 Remotion", "section": "5"},
      {"id": 8, "point": "Remotion vs 复制粘贴 HTML + 代价", "section": "6"},
      {"id": 9, "point": "引擎按 type 分发", "section": "7"},
      {"id": 10, "point": "组件清单", "section": "7"},
      {"id": 11, "point": "配置即内容、填字段别造组件、类型兜底", "section": "8,9"},
      {"id": 12, "point": "数字主持人基础版：陪衬/脚稳/反对口型", "section": "10"},
      {"id": 13, "point": "顶层读 window 打包崩 → MDC 规则一次写死", "section": "11"},
      {"id": 14, "point": "一行命令出片 npx remotion render", "section": "12"},
      {"id": 15, "point": "三步法回顾 + 没基础也能复制", "section": "13"},
      {"id": 16, "point": "关注 + 下期预告（EP03 字幕匹配）", "section": "13"},
      {"id": 17, "point": "自有风格组件库：现成组件上扩品牌化模板，后续单独一期", "section": "7"}
    ]
  }
}
```
