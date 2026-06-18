---
stage: 04-script
platform: bilibili
status: draft
source_workflow: /04-script-draft
---

# ep02 视频脚本：用 Vibe Coding 搭一套能自动出片的视频渲染引擎

> 画面（Remotion 组件映射 / Props / 子镜头时间线 / 录屏 zoom 指令）与口播一体；末尾 JSON 契约为下游 05/06/07/08/12 的唯一真相源（SSOT）。

---

## 第一段：【@IntroScene】开场（干货式钩子 + 三步路线图，30s）

- **[画面]** 调用 `@IntroScene`。Props `title`="用 Vibe Coding 搭一套自动出片的渲染引擎"，`subtitle`="把视频写成代码，让 AI 按配置自动出片"，`background`="grid"。
  - **[子镜头时间线]**（干货式钩子，实质画面，本段 >15s 必填）：0s 首屏呈现本期成果——一份配置 + 由它渲出的成片并排 → 4s 一句话点题落到主标题 → 12s 关键认知卡浮出（AI 强在文本/代码 → 渲染用数据驱动）→ 20s 浮出"① 找路径 / ② 选型 / ③ 落地"三步路线图依次点亮。
- **[口播]** 这期就一件事：用 Vibe Coding 搭一套渲染引擎，把视频写成代码、让 AI 按配置自动出片，改数据就改片。先记住一个关键认知：AI 最强的本事是啃文本和代码，所以想让渲染自动化，就得把视频变成代码和数据来驱动。我没有前后端基础，全程用大白话指挥 AI：我说要什么、判断对不对。这件事三步：让 AI 帮我找技术路径、对着约束选型、最后落地出片。

---

## 第二段：【@ConceptScene】找技术路径·让 AI 把路都摆出来（50s）

- **[画面]** 调用 `@ConceptScene`。Props `eyebrow`="找技术路径"，`title`="同一个内核：代码/数据描述画面 → 编译成帧 → 合成视频"，`items`=[{icon:"🌐",label:"网页渲染",title:"Remotion：React+CSS，复杂排版最拿手"},{icon:"📐",label:"数学动画",title:"Manim：Python 画公式几何"},{icon:"🎞️",label:"像素拼接",title:"MoviePy/FFmpeg：简单拼接、批量转码"}]。
  - **[子镜头时间线]**（本段 >15s 必填）：0s 内核标题入场 → 5s 第一张卡 stagger → 10s 第二张 → 15s 第三张 → 22s 底部追加一行小卡"Motion Canvas / PixiJS·Cocos"补全六条路 → 30s 高亮共同内核那句话。
- **[口播]** 第一步找路，我没自己埋头啃文档，直接把选择题丢给 AI：想把视频写成代码自动出片，现在都有哪些现成路子？它一口气摆了六条——Remotion 走网页那套、Manim 画数学公式、MoviePy 和 FFmpeg 做简单拼接，还有 Motion Canvas、PixiJS 这些。名字听着五花八门，但你扒到底，全在干同一件事：拿代码描述画面，编译成一帧帧，再合成视频。这一步只摆路，先不评好坏。

---

## 第三段：【@TableScene + @SplitLayout】技术选型·逼 AI 给"坑"，回到约束定 Remotion（90s）

- **[画面]** 调用 `@TableScene`。Props `columns`=["技术路线","适用场景","局限条件","关键约束"]，`rows`=[["Remotion","前端栈、复杂排版、跨期模板复用","纯后台超长批处理","顶层读 window 打包阶段崩；BUSL 授权"],["Motion Canvas","代码演示、精确时序","复杂网页排版","生态小、模板自建"],["Manim","数学/公式可视化","常规 UI 排版","排版弱、渲染慢"],["MoviePy","简单拼接、音轨闪避","自适应排版","文字繁琐、吃内存"],["FFmpeg","批量转码、字幕烧录","复杂动效","命令晦涩难调试"]]，`highlightColumn`="3"。
  - **[子镜头时间线]**（本段 >15s 必填）：0s 表头淡入 → 5s 五行依次 stagger 入场 → 25s Zoom 聚焦"关键约束"列 → 40s 切 `@SplitLayout` 左"✅ Remotion：改一处全系列生效 / 只填数据 / 一行命令出片" 右"❌ 复制粘贴 HTML：每期复制越改越乱 / 结构易跑偏" → 70s 浮出代价条"React 栈 + BUSL 授权（规模化付费）" → 80s 高亮选定 Remotion 行。
- **[口播]** 第二步选型，这步最容易翻车——你要是直接问 AI 哪个好，它会跟个老好人似的每个都夸一遍，你还是不会选。值钱的是看清每条路什么时候不好使。所以我反过来逼它：把每条路的适用场景和会咬人的坑全列出来。看这张表：Remotion 适合前端栈和复杂排版，但你在组件顶层直接读 window，打包阶段就当场崩，而且是 BUSL 商业授权；Manim 排版弱、渲染慢；MoviePy 写自适应排版能把人写吐；FFmpeg 命令跟天书一样。看清坑，我再对着自己的需求做减法：我要一期一个模板换数据批量出几十期、要 AI 改内容不容易错、要跨期好维护——这三条一卡，Remotion 赢了。跟复制粘贴 HTML 比，它改一处全系列生效，AI 也只能乖乖填数据、不乱跑结构。代价就一条：React 栈加 BUSL 授权，规模化商用要付费——但前端反正是 AI 写、我把方向，不算门槛。一句话：让 AI 铺信息，拍板的事留给你自己。

---

## 第四段：【@ConceptScene + @TerminalScene + @SplitLayout】技术落地①·配置分发 + 配置即内容（90s）

- **[画面]** ① `@ConceptScene` 讲流向：Props `eyebrow`="引擎怎么干活"，`title`="一份配置 → Explainer 按 type 分发 → 现成组件"，`items`=[{icon:"📝",label:"你写",title:"一份配置：说清这段是什么画面"},{icon:"🔀",label:"Explainer",title:"按 type 字段自动找组件"},{icon:"🧩",label:"组件",title:"comparison/terminal/charts… 照填就渲"}]。② 切 `@TerminalScene`：`language`="jsonc"，`code`=`{ "type": "comparison", "title": "传统剪辑 vs 代码即视频", "leftLabel": "传统剪辑", "leftValue": "拖时间轴，改一处全手工重排", "rightLabel": "代码即视频", "rightValue": "改一行配置，重新编译出片" }`。③ 切 `@SplitLayout` 左"❌ 让 AI 从零手写 ComparisonScene.tsx"右"✅ 只填数据，复用现成 @ComparisonCard"。
  - **[子镜头时间线]**（本段 >15s 必填）：0s 流向图入场 → 8s "配置→Explainer→组件"三段连通 → 25s 切终端、config 逐行打字 → 40s 高亮 `"type": "comparison"` → 50s 右侧注释浮出"TS 给每个字段定死格式，填错即编译报错" → 65s 切分屏左右对照 → 80s 高亮右侧"复用现成组件"。
- **[口播]** 选型定了，进第三步落地。好消息是搭引擎也不用你手写，就是跟 AI 把配置和现成组件对上号。仓库这台引擎叫 remotion-composer，干活特别直白：你写一份配置说清这段画面长啥样，主程序 Explainer 就看配置里的 type 字段，自动去找对应组件来渲。type 写 comparison 就出对比卡，terminal 是合成终端、不用真录屏，还有图表、分屏。所以做内容这事，本质就是挑组件、填字段。最省心的一招是：我从不让 AI 去发明新组件，只让它照现成的填数据。比如要张对比卡，我说左边传统剪辑、右边代码即视频，它吐出来就是这么一段配置，齐活。为啥稳？因为每个字段都用 TypeScript 把格式焊死了，AI 填错漏填，编译当场报红。记住：让 AI 填空，别让它造轮子。（想要更强辨识度，还能在现成组件上扩一套自有风格组件库——那是更大的话题，以后单开一期讲。）

---

## 第五段：【@SplitLayout + B 轨】技术落地·SSR 唯一的坑，把规则写死交给 AI（35s）

- **[B 轨]** `@VideoSlot`：`[B 轨占位替换提醒：请补充 IDE 录屏 — 左：组件顶层读 window 触发 ReferenceError 红屏（clip_id=b-ssr-crash）；右：加 typeof window 守卫 + 写入 .cursor/rules/remotion-ssr.mdc 后一次性渲出（clip_id=b-ssr-fix）]`。
- **[A 轨兜底]** 调用 `@SplitLayout`：左 `@TerminalScene` `code`=`const w = window.innerWidth; // 💥 ReferenceError: window is not defined`；右 `@TerminalScene` `code`=`const w = typeof window !== 'undefined' ? window.innerWidth : 1920;\n// .cursor/rules/remotion-ssr.mdc：组件顶层禁止直接读 window/document`。
  - **[子镜头时间线]**（本段 >15s 必填）：0s 分屏入场 → 4s 左侧崩溃代码/录屏淡入 → 12s 左侧震动强调 ReferenceError → 20s 右侧守卫代码/录屏淡入 → 28s 浮出 `.cursor/rules/remotion-ssr.mdc` → 32s 右侧 badge="一次通过"。
- **[口播]** 落地过程里唯一反复栽我的，就是 SSR 这个坑。看左边：组件顶层直接读了 window，可 Remotion 打包那会儿跑在 Node 里、还没进浏览器，当场就报 ReferenceError、渲染红屏。好比人还没进门就伸手拉灯，灯都没装上，当然摸空。右边怎么修：加一句 typeof window 判断。但更聪明的是别每次盯着 AI，而是把这条规则一次写死——塞进 .cursor/rules 一个 mdc 文件，指到引擎源码目录，往后 AI 生成组件自动带上。这就是 Vibe Coding 的精髓：重复的规矩，固化成规则交给 AI。

---

## 第六段：【@TableScene】技术落地②·数字人选型与落地（60s）

- **[画面]** 调用 `@TableScene`。Props `columns`=["形象方案","适用场景","坑 / 代价"]，`rows`=[["真人出镜","最可信、有温度","要露脸、不可编程复用、隐私成本"],["写实/对口型数字人","像真主播","易掉恐怖谷、可信度反崩；口型是重活"],["二次元/3D 风格化 VRM","风格统一、可编程、渲一次到处用","要建模与动作绑定，可交给 AI"]]，`highlightRow`="2"。
  - **[子镜头时间线]**（本段 >15s 必填）：0s 表头入场 → 4s 三行 stagger 入场 → 18s 高亮选定的 VRM 行 → 30s 切主持人"取景预设"示意（角落/半身/全身）→ 45s callout"脚踩稳：大腿上反向抵消髋部摆动"。
- **[口播]** 要不要个出镜形象做陪衬？这事也没拍脑袋，套的是跟选引擎一样的方法论：先把定位说死——它只是陪衬串场，不是主角。然后让 AI 把可选形象和各自的坑摆出来：真人最可信但要露脸、不能编程复用；写实对口型像真主播，可一不小心就掉进恐怖谷、可信度反而崩。对着我的约束——不想露脸、要可编程批量复用、还要避开恐怖谷——我选了 3D 风格化角色 VRMAvatar，并钉死一条死规矩：坚决不做对口型数字人、不做 AI 假界面，可信度只靠真实录屏换。落地也交给 AI：整体渲一次再按场景裁半身全身；之前它待机整条腿像钟摆一样甩，修法是在大腿上把髋部摆动反向抵消，脚就踩稳了。

---

## 第七段：【@OutroScene】结尾 CTA（20s）

- **[画面]** 调用 `@OutroScene`。Props `headline`="三步搭好你的自动出片引擎，没基础也能复制"，`cta`="关注 · 下期 EP03 用 Whisper 让字幕踩着话音跳"，`background`="gradient"。
  - **[子镜头时间线]**：0s 三步法回扣（找路径/选型/落地）依次点亮 → 8s 开源仓库地址浮出 → 14s 关注引导 + EP03 预告卡。
- **[口播]** 回头看就三步：找路径让 AI 把现成方案全摆出来、选型让 AI 列坑人对约束拍板、落地填配置套组件规则兜底让 AI 跑渲染。你要会的不是写代码，是讲清需求、看住坑、把规则固化给 AI——没基础也能复制。下期 EP03，用 Whisper 拿字级时间戳，让字幕踩着话音跳。关注别错过。

---

```json
{
  "title": "用 Vibe Coding 搭一套能自动出片的视频渲染引擎",
  "platform": "bilibili",
  "estimated_duration_seconds": 375,
  "total_word_count": 1700,
  "anti_hype_forbidden": ["颠覆", "革命性", "效率提升百倍", "几行代码搞定一切", "震撼", "封神"],
  "video_spec": { "aspect_ratio": "16:9", "resolution": "1920x1080", "fps": 30 },
  "b_track_assets_required": ["b-ssr-crash", "b-ssr-fix"],
  "sections": [
    {
      "id": "1",
      "section_ref": "开场钩子",
      "track": "A",
      "scene_template": "@IntroScene",
      "props": { "title": "用 Vibe Coding 搭一套自动出片的渲染引擎", "subtitle": "把视频写成代码，让 AI 按配置自动出片", "background": "grid" },
      "voice": "这期就一件事：用 Vibe Coding 搭一套渲染引擎，把视频写成代码、让 AI 按配置自动出片，改数据就改片。先记住一个关键认知：AI 最强的本事是啃文本和代码，所以想让渲染自动化，就得把视频变成代码和数据来驱动。我没有前后端基础，全程用大白话指挥 AI：我说要什么、判断对不对。这件事三步：让 AI 帮我找技术路径、对着约束选型、最后落地出片。",
      "visual_instructions": "@IntroScene 大字报 + 干货式钩子（首屏呈现配置→成片的真实成果，非演示表演）→ 关键认知卡 → 三步路线图点亮",
      "duration_hint_seconds": 30,
      "visual_beats": [
        {"at_seconds": 0, "action": "首屏呈现本期成果：一份配置 + 由它渲出的成片并排"},
        {"at_seconds": 4, "action": "一句话点题落到主标题"},
        {"at_seconds": 12, "action": "关键认知卡浮出：AI 强在文本/代码 → 渲染用数据驱动"},
        {"at_seconds": 20, "action": "三步路线图依次点亮"}
      ]
    },
    {
      "id": "2",
      "section_ref": "找技术路径",
      "track": "A",
      "scene_template": "@ConceptScene",
      "props": { "eyebrow": "找技术路径", "title": "同一个内核：代码/数据描述画面 → 编译成帧 → 合成视频", "items": [{"icon": "🌐", "label": "网页渲染", "title": "Remotion：React+CSS，复杂排版最拿手"}, {"icon": "📐", "label": "数学动画", "title": "Manim：Python 画公式几何"}, {"icon": "🎞️", "label": "像素拼接", "title": "MoviePy/FFmpeg：简单拼接、批量转码"}] },
      "voice": "第一步找路，我没自己埋头啃文档，直接把选择题丢给 AI：想把视频写成代码自动出片，现在都有哪些现成路子？它一口气摆了六条——Remotion 走网页那套、Manim 画数学公式、MoviePy 和 FFmpeg 做简单拼接，还有 Motion Canvas、PixiJS 这些。名字听着五花八门，但你扒到底，全在干同一件事：拿代码描述画面，编译成一帧帧，再合成视频。这一步只摆路，先不评好坏。",
      "visual_instructions": "@ConceptScene 内核标题 + 三张路线卡 stagger，底部补一行 Motion Canvas/PixiJS·Cocos 补全六条路",
      "duration_hint_seconds": 50,
      "visual_beats": [
        {"at_seconds": 0, "action": "内核标题入场"},
        {"at_seconds": 5, "action": "第一张卡 stagger"},
        {"at_seconds": 10, "action": "第二张卡 stagger"},
        {"at_seconds": 15, "action": "第三张卡 stagger"},
        {"at_seconds": 22, "action": "底部追加 Motion Canvas/PixiJS·Cocos 小卡"},
        {"at_seconds": 30, "action": "高亮共同内核那句话"}
      ]
    },
    {
      "id": "3",
      "section_ref": "技术选型",
      "track": "A",
      "scene_template": "@TableScene",
      "props": { "columns": ["技术路线", "适用场景", "局限条件", "关键约束"], "rows": [["Remotion", "前端栈、复杂排版、跨期模板复用", "纯后台超长批处理", "顶层读 window 打包阶段崩；BUSL 授权"], ["Motion Canvas", "代码演示、精确时序", "复杂网页排版", "生态小、模板自建"], ["Manim", "数学/公式可视化", "常规 UI 排版", "排版弱、渲染慢"], ["MoviePy", "简单拼接、音轨闪避", "自适应排版", "文字繁琐、吃内存"], ["FFmpeg", "批量转码、字幕烧录", "复杂动效", "命令晦涩难调试"]], "highlightColumn": "3" },
      "voice": "第二步选型，这步最容易翻车——你要是直接问 AI 哪个好，它会跟个老好人似的每个都夸一遍，你还是不会选。值钱的是看清每条路什么时候不好使。所以我反过来逼它：把每条路的适用场景和会咬人的坑全列出来。看这张表：Remotion 适合前端栈和复杂排版，但你在组件顶层直接读 window，打包阶段就当场崩，而且是 BUSL 商业授权；Manim 排版弱、渲染慢；MoviePy 写自适应排版能把人写吐；FFmpeg 命令跟天书一样。看清坑，我再对着自己的需求做减法：我要一期一个模板换数据批量出几十期、要 AI 改内容不容易错、要跨期好维护——这三条一卡，Remotion 赢了。跟复制粘贴 HTML 比，它改一处全系列生效，AI 也只能乖乖填数据、不乱跑结构。代价就一条：React 栈加 BUSL 授权，规模化商用要付费——但前端反正是 AI 写、我把方向，不算门槛。一句话：让 AI 铺信息，拍板的事留给你自己。",
      "visual_instructions": "@TableScene 五行判断层矩阵（stagger + 高亮关键约束列）→ 切 @SplitLayout 做 Remotion ✅ vs 复制粘贴 HTML ❌ 对照 → 代价条浮出 → 高亮 Remotion 行",
      "duration_hint_seconds": 90,
      "visual_beats": [
        {"at_seconds": 0, "action": "表头淡入"},
        {"at_seconds": 5, "action": "五行依次 stagger 入场"},
        {"at_seconds": 25, "action": "Zoom 聚焦关键约束列"},
        {"at_seconds": 40, "action": "切 @SplitLayout 左右对照 Remotion vs 复制粘贴 HTML"},
        {"at_seconds": 70, "action": "浮出代价条 React 栈 + BUSL 授权"},
        {"at_seconds": 80, "action": "高亮选定 Remotion 行"}
      ]
    },
    {
      "id": "4",
      "section_ref": "技术落地①·配置分发与配置即内容",
      "track": "A",
      "scene_template": "@SplitLayout",
      "props": { "intro_concept": { "eyebrow": "引擎怎么干活", "title": "一份配置 → Explainer 按 type 分发 → 现成组件" }, "terminal_code": "{ \"type\": \"comparison\", \"title\": \"传统剪辑 vs 代码即视频\", \"leftLabel\": \"传统剪辑\", \"leftValue\": \"拖时间轴，改一处全手工重排\", \"rightLabel\": \"代码即视频\", \"rightValue\": \"改一行配置，重新编译出片\" }", "split_left": "❌ 让 AI 从零手写 ComparisonScene.tsx", "split_right": "✅ 只填数据，复用现成 @ComparisonCard" },
      "voice": "选型定了，进第三步落地。好消息是搭引擎也不用你手写，就是跟 AI 把配置和现成组件对上号。仓库这台引擎叫 remotion-composer，干活特别直白：你写一份配置说清这段画面长啥样，主程序 Explainer 就看配置里的 type 字段，自动去找对应组件来渲。type 写 comparison 就出对比卡，terminal 是合成终端、不用真录屏，还有图表、分屏。所以做内容这事，本质就是挑组件、填字段。最省心的一招是：我从不让 AI 去发明新组件，只让它照现成的填数据。比如要张对比卡，我说左边传统剪辑、右边代码即视频，它吐出来就是这么一段配置，齐活。为啥稳？因为每个字段都用 TypeScript 把格式焊死了，AI 填错漏填，编译当场报红。记住：让 AI 填空，别让它造轮子。想要更强辨识度，还能在现成组件上扩一套自有风格组件库——那是更大的话题，以后单开一期讲。",
      "visual_instructions": "@ConceptScene 配置→Explainer→组件流向 → @TerminalScene 展示 comparison 配置 JSON 逐行打字 + 高亮 type → @SplitLayout 左从零手写 ❌ 右只填数据 ✅",
      "duration_hint_seconds": 90,
      "visual_beats": [
        {"at_seconds": 0, "action": "流向图入场"},
        {"at_seconds": 8, "action": "配置→Explainer→组件三段连通"},
        {"at_seconds": 25, "action": "切终端，config 逐行打字"},
        {"at_seconds": 40, "action": "高亮 \"type\": \"comparison\""},
        {"at_seconds": 50, "action": "右侧注释浮出 TS 字段定死格式，填错即编译报错"},
        {"at_seconds": 65, "action": "切分屏左右对照"},
        {"at_seconds": 80, "action": "高亮右侧复用现成组件"}
      ]
    },
    {
      "id": "5",
      "section_ref": "技术落地·SSR 避坑",
      "track": "A/B",
      "scene_template": "@SplitLayout",
      "props": { "left_terminal": "const w = window.innerWidth; // 💥 ReferenceError: window is not defined", "right_terminal": "const w = typeof window !== 'undefined' ? window.innerWidth : 1920;\n// .cursor/rules/remotion-ssr.mdc：组件顶层禁止直接读 window/document" },
      "voice": "落地过程里唯一反复栽我的，就是 SSR 这个坑。看左边：组件顶层直接读了 window，可 Remotion 打包那会儿跑在 Node 里、还没进浏览器，当场就报 ReferenceError、渲染红屏。好比人还没进门就伸手拉灯，灯都没装上，当然摸空。右边怎么修：加一句 typeof window 判断。但更聪明的是别每次盯着 AI，而是把这条规则一次写死——塞进 .cursor/rules 一个 mdc 文件，指到引擎源码目录，往后 AI 生成组件自动带上。这就是 Vibe Coding 的精髓：重复的规矩，固化成规则交给 AI。",
      "visual_instructions": "B 轨双录屏（左崩溃红屏/右守卫+规则一次渲出）；A 轨兜底 @SplitLayout 双 @TerminalScene 对照 + 浮出 .cursor/rules/remotion-ssr.mdc",
      "duration_hint_seconds": 35,
      "visual_beats": [
        {"at_seconds": 0, "action": "分屏入场"},
        {"at_seconds": 4, "action": "左侧崩溃代码/录屏淡入"},
        {"at_seconds": 12, "action": "左侧震动强调 ReferenceError"},
        {"at_seconds": 20, "action": "右侧守卫代码/录屏淡入"},
        {"at_seconds": 28, "action": "浮出 .cursor/rules/remotion-ssr.mdc"},
        {"at_seconds": 32, "action": "右侧 badge 一次通过"}
      ]
    },
    {
      "id": "6",
      "section_ref": "技术落地②·数字人选型与落地",
      "track": "A",
      "scene_template": "@TableScene",
      "props": { "columns": ["形象方案", "适用场景", "坑 / 代价"], "rows": [["真人出镜", "最可信、有温度", "要露脸、不可编程复用、隐私成本"], ["写实/对口型数字人", "像真主播", "易掉恐怖谷、可信度反崩；口型是重活"], ["二次元/3D 风格化 VRM", "风格统一、可编程、渲一次到处用", "要建模与动作绑定，可交给 AI"]], "highlightRow": "2" },
      "voice": "要不要个出镜形象做陪衬？这事也没拍脑袋，套的是跟选引擎一样的方法论：先把定位说死——它只是陪衬串场，不是主角。然后让 AI 把可选形象和各自的坑摆出来：真人最可信但要露脸、不能编程复用；写实对口型像真主播，可一不小心就掉进恐怖谷、可信度反而崩。对着我的约束——不想露脸、要可编程批量复用、还要避开恐怖谷——我选了 3D 风格化角色 VRMAvatar，并钉死一条死规矩：坚决不做对口型数字人、不做 AI 假界面，可信度只靠真实录屏换。落地也交给 AI：整体渲一次再按场景裁半身全身；之前它待机整条腿像钟摆一样甩，修法是在大腿上把髋部摆动反向抵消，脚就踩稳了。",
      "visual_instructions": "@TableScene 三行形象选型矩阵（stagger + 高亮选定 VRM 行）→ 切主持人取景预设示意 + 脚踩稳 callout",
      "duration_hint_seconds": 60,
      "visual_beats": [
        {"at_seconds": 0, "action": "表头入场"},
        {"at_seconds": 4, "action": "三行 stagger 入场"},
        {"at_seconds": 18, "action": "高亮选定的 VRM 行"},
        {"at_seconds": 30, "action": "切主持人取景预设示意（角落/半身/全身）"},
        {"at_seconds": 45, "action": "callout 脚踩稳：大腿上反向抵消髋部摆动"}
      ]
    },
    {
      "id": "7",
      "section_ref": "结尾 CTA",
      "track": "A",
      "scene_template": "@OutroScene",
      "props": { "headline": "三步搭好你的自动出片引擎，没基础也能复制", "cta": "关注 · 下期 EP03 用 Whisper 让字幕踩着话音跳", "background": "gradient" },
      "voice": "回头看就三步：找路径让 AI 把现成方案全摆出来、选型让 AI 列坑人对约束拍板、落地填配置套组件规则兜底让 AI 跑渲染。你要会的不是写代码，是讲清需求、看住坑、把规则固化给 AI——没基础也能复制。下期 EP03，用 Whisper 拿字级时间戳，让字幕踩着话音跳。关注别错过。",
      "visual_instructions": "@OutroScene 三步法回扣点亮 + 开源仓库地址 + 关注引导 + EP03 预告卡",
      "duration_hint_seconds": 20,
      "visual_beats": [
        {"at_seconds": 0, "action": "三步法回扣依次点亮"},
        {"at_seconds": 8, "action": "开源仓库地址浮出"},
        {"at_seconds": 14, "action": "关注引导 + EP03 预告卡"}
      ]
    }
  ],
  "zoom_crop_directives": [
    { "clip_id": "b-ssr-crash", "timestamp_start": "00:00", "timestamp_end": "00:08", "zoom_level": 1.6, "focal_point": { "x": 0.4, "y": 0.45 } },
    { "clip_id": "b-ssr-fix", "timestamp_start": "00:00", "timestamp_end": "00:10", "zoom_level": 1.6, "focal_point": { "x": 0.5, "y": 0.5 } }
  ],
  "coverage_checklist": {
    "开场": "S1：点题+AI 强在文本代码→数据驱动+人设+三步路线图",
    "找技术路径": "S2：AI 罗列六条路线+共同内核只列不评",
    "技术选型": "S3：逼 AI 给不适用+坑+回到约束选 Remotion+vs 复制粘贴 HTML+代价如实说",
    "技术落地①": "S4：配置→Explainer 按 type 分发+配置即内容 TS 兜底+自有风格组件库一句带过",
    "技术落地·SSR": "S5：SSR window 崩溃坑+typeof 守卫+规则固化进 .cursor/rules",
    "技术落地②": "S6：数字人定位陪衬+三种形象选型+选定 VRM 不做对口型+取景/脚站稳落地",
    "总结CTA": "S7：三步法回顾+没基础也能复制+EP03 预告"
  },
  "judgment_layer_coverage": {
    "highlights_pitfall": true,
    "explains_boundary": true,
    "acceptance_standard": true
  }
}
```
