---
name: Grojayn Personal Site
description: 清新优雅的个人作品集网站，蓝墨水在素白纸上的气质
colors:
  paper-white: "#fafafa"
  cool-gray-bg: "#f3f3f3"
  ink: "#1a1a1a"
  ink-secondary: "#666666"
  ink-muted: "#999999"
  morning-blue: "#2563eb"
  morning-blue-deep: "#1d4ed8"
  hairline: "#e5e5e5"
  card-white: "#ffffff"
typography:
  display:
    fontSize: "clamp(48px, 8vw, 80px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontSize: "32px"
    fontWeight: 700
    letterSpacing: "-0.03em"
  title:
    fontSize: "18px"
    fontWeight: 600
    letterSpacing: "-0.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontSize: "13px"
    fontWeight: 450
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
spacing:
  section-y: "120px"
  card-inner: "24px"
  card-generous: "36px 32px"
components:
  button-primary:
    backgroundColor: "{colors.morning-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.morning-blue-deep}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 28px"
  card-default:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-inner}"
  tag-chip:
    backgroundColor: "rgba(37,99,235,0.08)"
    textColor: "{colors.morning-blue}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
---

# Design System: Grojayn Personal Site

## 1. Overview

**Creative North Star: "The Morning Studio"**

像清晨第一道光打在工作台上。干净、微凉、充满可能性。这是一个技术人的作品展台，不是营销公司的落地页。它应该是安静而有力量的：白底上的蓝墨水，精心排版的文字，恰到好处的留白。没有炫技的动画，没有廉价的装饰，像一个整理得井井有条的桌面。

这个设计系统明确拒绝 AI 生成的模板美学。不用渐变色文字、不用玻璃态卡片、不用千篇一律的 SaaS 布局、不用奶油色/沙色暖调背景。它偏好系统字体而非设计字体（因为访问者要看内容，不是看字体），因为真实的开发者工具就是用系统字体。蓝色是克制的点缀色，大面积留白才是主角。

**Key Characteristics:**
- 高对比度中性色（白底黑字，不玩灰色层级游戏）
- 单一点缀色占屏 ≤10%，蓝色是标点符号不是正文
- 圆角 6-12px 的柔和矩形，拒绝锐利工业感
- 亚光表面，投影极浅（更像空气层而不是 3D 阴影）
- 交互动效克制：hover 轻抬 + 投影加深，入场只是淡入

## 2. Colors

单点蓝色 + 高对比黑白灰体系。蓝色是呼吸口，白色是主体，灰色只用于必要的信息降级。

### Primary
- **Morning Blue** (#2563eb): 唯一的品牌点缀色。用于链接、按钮、强调数字、section-title 下划线。任何给定屏幕上占比不超过 10%。
- **Morning Blue Deep** (#1d4ed8): hover 态颜色。仅在交互反馈时出现。

### Neutral
- **Paper White** (#fafafa): 页面主背景。轻微冷调（非暖调奶油），保持清晨的清爽感。
- **Cool Gray BG** (#f3f3f3): 次要区块背景（about、projects section），用于分区而不加明显边框。
- **Card White** (#ffffff): 卡片背景。纯白，与 Paper White 形成微妙层次。
- **Ink** (#1a1a1a): 主要文字色。接近纯黑但不刺眼。
- **Ink Secondary** (#666666): 次要文字，段落描述。与背景对比度 5.1:1，满足 WCAG AA。
- **Ink Muted** (#999999): 最弱文字层级，标签和占位信息。对比度 3.6:1，仅用于 ≥14px 文本。
- **Hairline** (#e5e5e5): 边框和分割线。存在但不引人注意。

### Named Rules
**The Ten Percent Rule.** 蓝色在任何给定屏幕上占比不超过 10%。它的力量来自于稀缺，每出现一次都在传递一个明确的信号。

**The No-Warm-White Rule.** 主背景使用接近中性或微冷调的白（#fafafa），不使用暖调奶油/沙色/米色纸张色。那是 AI 调色板的默认选择。

## 3. Typography

**Display/Body Font:** System UI stack (-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Microsoft YaHei, Hiragino Sans GB, sans-serif)

No design font, no Google Fonts, no custom @font-face. The system stack loads instantly, renders natively, and reads like a real app, not a brochure. 中文字体优先级：苹方 → 微软雅黑 → 冬青黑体。

**Character:** 中性系统字，未装饰的现代感。不靠字体个性表达品牌，靠排版节奏和留白。

### Hierarchy
- **Display** (700, clamp(48px, 8vw, 80px), 1.05): Hero 姓名。全站最大声音，一次出现。
- **Headline** (700, 32px, -0.03em): Section 标题。底部蓝色短线装饰。
- **Title** (600, 18px, -0.02em): 卡片标题，技能名，项目名。
- **Body** (400, 16px/17px, 1.8): 正文段落。max-width 限定在 65-75ch。
- **Label** (450, 13px, normal): 统计标签、标签文字、辅助信息。

### Named Rules
**The Two-Weight Rule.** 全站只用 400 和 600-700 两个粗度梯队，没有 500。对比来自明确级差，不是微调。

**The System-First Rule.** 不使用 Web 字体。系统原生字在中文语境下渲染最快、最清晰，且消除了 FOUT/CLS。

## 4. Elevation

亚光表面 + 极低投影。这个系统不追求 3D 纵深感，更像是叠放在工作台上的纸片：之间有轻微空气层，但不是浮雕。

### Shadow Vocabulary
- **Ambient Low** (0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)): 卡片/统计块静止态。几乎看不到，只是微微抬起。
- **Ambient High** (0 10px 30px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)): hover 抬起态。投影加深 + 元素上移 2-4px。

### Named Rules
**The Flat-By-Default Rule.** 所有表面在静止状态下是平的或几乎平的。投影只作为 hover 状态的响应出现，不作为默认层叠信号。

## 5. Components

### Buttons
- **Shape:** 8px 圆角，柔和不失精确。
- **Primary:** 蓝色实底 + 白色文字，12px 28px 内边距。hover 加深蓝色 + 上移 1px + 蓝色辉光投影。
- **Outline:** 透明底 + 1px Hairline 边框 + ink 文字。hover 边框变 ink。
- **Transition:** `all 0.2s ease`，统一且快速。

### Cards / Containers
- **Corner Style:** 12px 圆角。
- **Background:** Card White (#ffffff)，border: 1px Hairline。
- **Shadow Strategy:** 静止态 Ambient Low，hover 后 Ambient High + translateY(-2px) 或 (-4px)。
- **Internal Padding:** 24px 标准，36px 32px 宽裕版（技能卡）。

### Tags / Chips
- **Style:** 蓝色 8% 透明度背景 + Morning Blue 文字。12px 字，500 粗度。6px 圆角，4px 10px 内边距。小型信息标签，不抢内容风头。

### Navigation
- **Style:** 固定顶部，backdrop-filter blur(12px) 半透明背景。下边框 1px Hairline。
- **Links:** 14px 450 粗度 Ink Secondary 色。hover 变 Ink 色。transition 0.2s。
- **Logo:** 22px 700 粗度 Morning Blue 色，-0.5px 字间距。

### Like Button (Stat)
- **Default:** 与普通 Stat 相同的外观（12px 圆角卡片 + 1px 边框）。
- **Liked:** 边框变蓝色，背景微染蓝色（4% 透明度），心形变红 #ef4444，数字变蓝。触发 0.6s 心跳动画 + 0.8s +1 飘浮动画。

## 6. Do's and Don'ts

### Do:
- **Do** 保持大面积留白。白色是呼吸，不是浪费。
- **Do** 使用系统字体栈。加载即渲染，不引入外部字体。
- **Do** 蓝色单词出现 ≤10% 面积。问自己"这一屏一定要有蓝色吗"。
- **Do** 用对比度驱动灰度选择：正文 ≥4.5:1，弱化文字 ≥3:1。
- **Do** hover 反馈用轻量 transform（上移 1-4px）+ 投影加深，统一 0.2-0.25s 过渡。

### Don't:
- **Don't** 使用渐变色文字 (background-clip: text + gradient)。
- **Don't** 使用玻璃态卡片（backdrop-filter blur 仅用于导航栏，不作装饰）。
- **Don't** 使用暖调奶油/沙色/米色作为主背景色。
- **Don't** 使用 side-stripe 边框（border-left/right > 1px 彩色装饰线）。
- **Don't** 在卡片内嵌套卡片。
- **Don't** 使用 hero-metric 模板（大数字 + 渐变色 + SaaS 统计条）。
- **Don't** 使用 AI 默认工具类设计语言：小号大写追踪标签（ABOUT / PROJECTS）、编号 section 标记（01 / 02 / 03）。
