# 🥔 土豆英雄·游戏百科 Wiki 纯静态全量站点 (238 篇真实数值词条)

一套专为土豆主题生存/割草游戏量身打造的**极简明亮风光 Wiki 站点**。
基于你提供的游戏本地化配置与底层引擎运行数值，已**全自动构建并打通 238 个独立 HTML 词条页面**！

---

## 🗂️ 8 大核心分类与 238 个词条完整对应

全站遵循纯静态 HTML 规范，每个词条的文件名均采用游戏配置的唯一代号命名（如 `tater-mines.html`）：

| 游戏前缀 / 引擎模块 | 词条分类 | 数量 | 典型代表页面 |
| :--- | :--- | :---: | :--- |
| `content.weapon.*` / `pe`+`me`+`he` | **武器大全 (Weapons)** | **75 篇** | [`tater-mines.html`](tater-mines.html) 土豆地雷、[`big-fry.html`](big-fry.html) 大薯条(超武)、[`fry-brigade.html`](fry-brigade.html) 薯条军团(双核融合) |
| `content.passive.*` / `ge` | **被动能力 (Passives)** | **22 篇** | [`fertilizer.html`](fertilizer.html) 肥料、[`bacon-bits.html`](bacon-bits.html) 培根碎、[`gpu.html`](gpu.html) GPU、[`rotten-spud.html`](rotten-spud.html) 烂土豆 |
| `content.item.*` / `_e`+`ve` | **道具收集 (Items)** | **42 篇** | [`baked-buckler.html`](baked-buckler.html) 烤土豆盾、[`all-seeing-spud.html`](all-seeing-spud.html) 全知薯眼(超限)、[`fry-volcano.html`](fry-volcano.html) 薯条火山 |
| `content.poi.*` / `Oe`+`ke` | **建筑设施 (Buildings/POI)** | **21 篇** | [`botDock.html`](botDock.html) Bot充电站(含4大辅助僚机)、[`bossLair.html`](bossLair.html) 首领巢穴、[`curseShrine.html`](curseShrine.html) 诅咒祭坛 |
| `content.enemy.*` / `ye` | **敌人小怪 (Enemies)** | **42 篇** | [`aphid.html`](aphid.html) 蚜虫、[`field-rat.html`](field-rat.html) 田鼠、[`oil-drip.html`](oil-drip.html) 油滴、[`grease-fiend.html`](grease-fiend.html) 油污恶魔 |
| `content.boss.*` / `be` | **首领 BOSS (Bosses)** | **13 篇** | [`harvester.html`](harvester.html) 收割机(16,000 HP)、[`fryer-king.html`](fryer-king.html) 炸锅之王、[`beetle-queen.html`](beetle-queen.html) 科罗拉多女王 |
| `content.biome.*` / `xe` | **地区世界 (Biomes)** | **12 篇** | [`potato-field.html`](potato-field.html) 土豆田、[`chip-canyons.html`](chip-canyons.html) 薯片峡谷、[`ketchup-bog.html`](ketchup-bog.html) 番茄酱沼泽 |
| `content.dog.*` / `Se`+`ue` | **萌犬伙伴 (Dogs)** | **11 篇** | [`zelda-and-link.html`](zelda-and-link.html) Zelda & Link(传说合体双神犬)、[`corgi.html`](corgi.html) 华夫·柯基、[`beagle.html`](beagle.html) 比格小探 |

---

## 💎 真实游戏数据与深度机制

每个页面均收录了真实底层引擎数值与机制：
1. **武器 (Weapons)**：包含基础伤害、冷却、弹道数、速度、范围、穿透、击退及 **Lv.1 - Lv.7 完整数值升级树**，支持点击互通的基础武器 ➔ 催化被动 ➔ 超武形态合成路线，以及双核武器终极融合；
2. **被动 (Passives)**：包含单级成长幅度与 **Lv.1 - Lv.5 满级累加表**，并清晰列出该被动作为催化剂可合成的所有超级武器与超限道具；
3. **道具 (Items)**：支持普通/优秀/稀有/史诗/传说 5 阶品质，收录 34 件基础道具与 8 件超限道具的触发概率、内置冷却与衍生爆炸/追踪机制；
4. **首领 (Bosses)**：内置首领 HP 血条微件（如 16,000 HP 收割机），清晰拆解冲锋扑咬前摇与扇形/环形/螺旋弹幕轮盘；
5. **生态与波次 (Biomes)**：内置 **第 1 - 5 分钟怪物波次刷新时间轴** 与灼热油池/泥沼减速等真实环境机制；
6. **狗狗羁绊 (Dogs)**：收录主动技能周期与团队常驻光环，并包含 **博美 (Link) + 吉娃娃 (Zelda) ➔ 传说双神犬【塞尔达与林克】** 的专属羁绊。

---

## ⚡ 侧边栏单源同步架构

全站所有 238 个 HTML 页面均引用了 [`js/sidebar-data.js`](js/sidebar-data.js)。
- **修改一处，全站生效**：你只需在 `sidebar-data.js` 中新增/修改条目，所有页面侧边栏自动更新；
- **智能高亮与折叠**：打开任意页面时，系统会自动展开所属分类，并对当前页面进行高亮；
- **自适应滚动与快速搜索**：按键盘 `/` 键可随时聚焦快速搜索框，实时模糊筛选。

---

## 🛠️ 如何再次批量构建或更新？

项目中包含了一键构建脚本 [`build_full_wiki.js`](build_full_wiki.js)：
```bash
node build_full_wiki.js
```
可在 1 秒内全自动解析数据、生成所有 238 个静态 HTML 页面并同步更新全站侧边栏！
