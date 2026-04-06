# 更新日志 (Changelog)

本文档遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 规范。

---

## [v1.4.0] - 2026-04-07

### 🚀 性能优化与工程化（Performance & Engineering）

基于 Chrome DevTools 与 Lighthouse 审计引擎，对本平台实施了深度的性能边界压榨与产物瘦身：

- **构建产物体积骤降** (`vite.config.js`)：引入 `rollup-plugin-visualizer` 定位空间瓶颈，重置 Vite 底层 `build.rollupOptions` 指向，将庞大的 `Vue` 运行时与 `Element Plus` 抽离解耦为长效缓存的 manualChunks，配合 `vite-plugin-compression` 执行全量 Gzip 静态压缩。致使首屏核心主业务包从 **262 KB** 断崖式缩减至 **19.8 KB** (瘦身突破 92%)。
- **网络瀑布流前置抢跑** (`index.html`)：于入口注入 `<link rel="preconnect">` 与 `dns-prefetch`，强制宿主浏览器绕过渲染阻塞，提前与数据 API（itheima）及资源 CDN（网易严选）修筑 TCP/TLS 网络甬道。
- **图片的云端降维打击** (`src/directives/index.js`)：侵入式重写全局懒加载指令 `v-img-lazy` 核心，对外部主图强制挂载 `?imageView&thumbnail=400x0&type=webp` 云端魔法裁剪属性。一举斩断高达 **3.4 MB** 的无用大图带宽溢磨，将核心指标 LCP 从 3.1s 下钻至极速的 **1.7 s**，FCP 突破入 **0.9 s** 满分梯队。
- **微任务交互边界测试** (Trace 排爆)：借力 Chrome 原级 Native Performance 录像导出极限压测 Trace 模型，证明依靠 Vue3 内部微任务机制合并状态变化，可使得购物车在连续 75 次密集狂点场景下的主线程处理均值仍被稳稳压制在 **4.2 ms** 内。彻底去除了破坏手感的 `Debounce` 防抖包装，坚守不臆造架构瓶颈的安全准绳。
## [v1.3.0] - 2026-04-04

### 🎨 品牌重构（Brand Refactor）

本版本将项目品牌由「小兔鲜」全面迁移至「**优选商城**」，涉及视觉层、文案层的以下改动：

- **配色方案替换** (`src/styles/var.scss`)：将全站 5 个 SCSS 颜色变量由清新生鲜绿色系替换为温润的深焙琥珀棕色系（如品牌主色 `$xtxColor: #27ba9b` → `#8B4513`）。
- **全局背景色调整** (`src/styles/common.scss`)：页面背景由冷调浅灰 `#f5f5f5` 改为暖米色 `#F5F0E8`。
- **品牌名称替换**：将代码中所有「小兔鲜」/ 「小兔鲜儿」文字替换为「优选商城」，涉及 `LayoutHeader.vue`、`LayoutFooter.vue`、`Login/index.vue`、`Pay/PayBack.vue` 共 4 个文件。
- **首页区块文案更新** (`HomeNew.vue`, `HomeHot.vue`, `HomeCategory.vue`)：将「新鲜好物」「人气推荐」「分类推荐」等生鲜语境标题替换为「臻选上新」「器具精选」「品类推荐」等通用商城语境文案。
- **卡片及悬停颜色** (`HomeNew.vue`, `HomeCategory.vue`)：商品卡片背景 `#f0f9f4`→`#f5efe6`，弹层悬停色 `#e3f9f4`→`#f5ebe0`，去除生鲜绿色调。
- **Logo 替换**：更换 `src/assets/images/logo.png` 为新品牌「优选商城」Logo 图片；相应调整 `LayoutHeader.vue` 中 Logo 容器尺寸（`width: 350px`，`height: 100px`）、背景定位与右边距，使其与导航栏视觉对齐。
- **登录页提示** (`Login/index.vue`)：新增 Mock 测试环境说明文字，引导演示者使用任意账号密码登录。

### 🐛 Bug 修复（Bug Fixes）

#### [修复 1] 登录后商品详情页白屏
- **文件**：`src/utils/http.js`
- **原因**：Mock 假登录模式下，Axios 请求拦截器将伪造的假 Token（`mock-token-for-local-testing`）附加到所有请求头中，导致服务器对公开商品详情 API 也返回 401 拦截，`goods.details` 无法获取，页面 `v-if` 判断失败，整页白屏。
- **修复**：在请求拦截器中增加判断，仅当 Token 不为测试假值时才携带 Authorization 请求头，使公开接口正常通行。

#### [修复 2] 加入购物车无反应
- **文件**：`src/stores/cartStore.js`
- **原因**：`isLogin` 计算属性仅通过 Token 是否存在进行判断，假 Token 也被视为已登录，购物车操作走「已登录」分支调用真实后端 API，服务器因假 Token 返回 401 错误导致静默失败，前端购物车无任何变化。
- **修复**：在 `isLogin` 判断中同步排除假 Token，让购物车操作在测试模式下走本地存储分支，完全脱离真实后端。

#### [修复 3] 雪花算法大整数 ID 商品详情页打不开
- **文件**：`src/utils/http.js`
- **原因**：服务器返回的部分商品 ID 为 19 位雪花算法（Snowflake ID）长整数，远超 JavaScript 安全整数范围（`Number.MAX_SAFE_INTEGER` = 9007199254740991，最大16位）。浏览器在 `JSON.parse()` 阶段将该数值截断为另一个不准确的数字，路由传参时使用失真 ID，服务器据此查询不到对应商品，返回空数据，详情页白屏。
- **修复**：在 Axios 实例的 `transformResponse` 中，于 `JSON.parse()` 执行之前，用正则表达式将所有 16 位及以上的大数字自动加上引号转换为字符串，彻底保留原始精度。同时加入 `try-catch` 降级处理和类型守卫，防止非 JSON 响应导致解析崩溃。

#### [修复 4] 商品详情页面包屑 / 品牌信息 null 崩溃
- **文件**：`src/views/Detail/index.vue`
- **原因**：部分商品的 API 响应中 `categories[1]`（父分类）及 `brand`（品牌）字段值为 `null`，而模板代码直接裸访问（`goods.categories[1].name`、`goods.brand.name`），触发 `TypeError: Cannot read properties of null (reading 'name')`，导致 Vue 渲染器崩溃、整页白屏。
- **修复**：在模板中对上述字段加入 JavaScript 可选链操作符 `?.` 进行空值保护（`goods.categories?.[1]?.name`、`goods.brand?.name`），访问路径为 null/undefined 时安全返回 undefined 而非抛错。

---



### Added

- **购物车删除功能**：用户现在可以在购物车列表中单独删除指定商品，操作更加灵活便捷。
- **商品搜索功能**：新增完整的搜索业务逻辑，用户在搜索框输入关键词后，可跳转至搜索结果页并展示匹配商品列表（此前仅有搜索框 UI，不具备实际搜索能力）。
- **图片懒加载组件 (ImageView)**：封装全局图片懒加载组件，结合 Vite 配置进行注册，减少页面初始资源加载量，提升首屏性能。

### Changed

- **商品详情页跳转修复**：修复首页商品卡片点击后无法跳转至对应商品详情页的导航问题，现已可正常进入详情页查看商品信息。
- **图片懒加载逻辑优化**：重构了图片懒加载的触发机制，确保在多种滚动场景下均能正确延迟加载，避免资源的提前或遗漏加载。
- **路由过渡与骨架屏**：完善路由切换时的页面过渡动效，并集成骨架屏功能，数据加载期间展示占位内容，消除页面空白闪烁。
- **代码可读性提升**：对核心业务模块补充了详细的中文注释，便于后续维护与功能迭代。

---

## [v1.0.0] - 2025-12-25

### Added

- 项目初始化并推送至 GitHub，包含完整的电商核心页面：首页、分类页、商品详情页、购物车、订单结算、支付及个人中心。
- 基于 Vue 3 + Vite 4 + Pinia + Element Plus 构建基础工程化框架，配置路由、状态管理和 Axios 拦截器。
- 集成 Pinia 持久化插件，实现用户登录状态与购物车数据的本地持久存储。
- 配置 `unplugin-auto-import` 与 `unplugin-vue-components`，实现 API 和组件的自动按需引入。
- 集成 Sass 主题系统，通过全局 SCSS 变量对 Element Plus 进行品牌色深度定制。
