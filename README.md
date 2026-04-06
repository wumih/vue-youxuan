# 🛍️ 优选商城 (YouXuan Mall)

> 一个基于 **Vue 3 全家桶**构建的现代化 B2C 电商平台前端应用

---

## 📖 项目简介

**优选商城**是一个功能完整的 B2C 电商前端项目，基于 Vue 3 Composition API 构建，涵盖商品浏览、分类筛选、搜索、购物车管理、订单结算、支付等完整业务链路。项目采用主流的工程化实践，提供流畅的用户体验与高可维护性的代码结构，适合作为 Vue3 全家桶学习与项目展示使用。

> **说明**：本项目由「小兔鲜」开源教学模板重构而来，已完成品牌视觉与文案层的全面替换，并修复了若干已知 Bug（详见 CHANGELOG.md）。

---

## 🚀 核心亮点：性能优化与工程化落地

本项目在开发全周期深度贯彻了“性能先行”的工程化规范。依托 Chrome DevTools 与 Lighthouse 审计工具，打通了从「瓶颈侦测」到「方案落地」的数据验证闭环。

### 1. 构建打包体积降维突破 (Bundle Size)

- **痛点 (Situation)**：初始项目将 Vue 运行时、Element Plus 组件树与核心业务逻辑实施了无差别打包。首屏单挂载核心文件高达 **262 KB**，在弱网环境下造成明显的白屏解析停顿。
- **行动 (Action)**：引入 `rollup-plugin-visualizer` 插件构建模块空间雷达体系；重写 Vite 的 `build.rollupOptions.manualChunks` 拓扑树，将基础运行框架从变动更密集的业务代码中解耦抽离；并全局植入 `vite-plugin-compression` 执行静态 Gzip 编译层压缩。
- **结果 (Result)**：主包分离后核心业务代码体积从 **262 KB** 暴降至 **19.8 KB**（瘦身率达 **92%**），同时利用浏览器长效控制机制安全缓存第三方依赖，直接清除了下行链路的最大负载屏障。
<img width="1734" height="933" alt="Image" src="https://github.com/user-attachments/assets/b3d345dd-8c4f-4316-bcd7-ee7b48a855e6" />

### 2. 核心渲染路径与 LCP 指标攻坚

- **痛点 (Situation)**：作为电商平台，海量的楼层商品与超级轮播图构成天然的渲染瓶颈。原基准线下 Lighthouse 评级警报亮起，最大内容绘制耗时 (LCP) 探底被拖慢至 **3.1 s**，且无用原图带来的网络负载高达 6.6 MB。
- **行动 (Action)**：

   - **网络层前置**：在入口 HTML 注入 `<link rel="preconnect">` 及 `dns-prefetch` 标记，促使浏览器在 HTML 解析阶段直接抢开阿里云/网易严选云端图片 CDN 与 API 接口的 TCP 及 TLS 连接。
   - **云端裁剪代理**：全局“潜入并重构”了原生懒加载核心指令 `v-img-lazy`。对所有商品挂载图进行 AST 级别链接劫持，自动附带 `?imageView&thumbnail=400x0&type=webp` CDN 云端魔法参数。
   - 
- **结果 (Result)**：全站免除了逐组件修改的代码灾难。直接斩断约 **3.4 MB** 的无用宽带损耗，将关键 LCP 指标从 3.1s 粗暴下钻至 **1.7 s** 极品分级，首次内容呈现 (FCP) 亦一举突破至 **0.9 s** 的满分绿区。
- #### 📊 本项性能基准测试审计报告 (Lighthouse Report)

为了确保优选商城的极致体验，我们对生产版本进行了全量的性能审计。

| 核心评分 (分数越高越好) | 关键渲染指标 (时间越短越好) | 审计数据溯源 |
| :--- | :--- | :--- |
| ![Lighthouse 跑分截图](<img width="944" height="699" alt="Image" src="https://github.com/user-attachments/assets/0b138840-3757-4a69-a09e-020b129e058f" />) | - **FCP**: 0.9s (绿色完美区)<br>- **LCP**: 1.7s (极速加载)<br>- **CLS**: 0.001 (零布局偏移) | [点击查看 ⬇️ 完整交互报告](https://htmlpreview.github.io/?你的GitHub文件链接) |

> 👨‍💻 **技术复盘**：本项目拒绝虚假的“大幅提升”，所有量化数据均基于真实的 Trace 事件分析。开发者可以通过导入仓库内的 `docs/lighthouse-data.json` 至测试工具进行数据对质。


### 3. 基于 Trace 执行帧的高频交互诊断

- **痛点 (Situation)**：购物车组件内含高度密集的商品数量加减 (`+/-`) 高频次操作，常规开发思维往往会盲目包裹 Debounce / Throttle 函数以防主线程卡死，但却极易带来破坏体验的滞后感。
- **行动 (Action)**：使用 Chrome DevTools Native Performance 面板录制底层的 `Trace.json` 文件进行渲染压测。主动构造了连击 **75 次**的数据扰动洪峰，逐帧反解 Vue3 的 Proxy 响应式系统合并更新与 Pinia 状态映射的微任务合并开销。
- **结果 (Result)**：经过数据量化，75次疯狂交互下主线 Event Dispatch 的每次处理均值被稳稳压制在完美的 **4.2 ms** 内，极值波峰未超 **50 ms**。最终确认当前架构通过 Virtual DOM 的 Diff 算法可以完美免疫此类高频短任务卡顿。由此用真实数据得出了 **“业务不需要引入无用防抖破坏体验”** 的逆向架构判断。

---

## 🛠️ 核心技术栈

- **核心框架**：`Vue 3.2` + `Composition API` — 组合式 API，逻辑高度复用
- **构建工具**：`Vite 4` — 毫秒级热更新，开发体验极速
- **状态管理**：`Pinia 2` + `pinia-plugin-persistedstate` — 支持数据持久化（购物车、用户态）
- **路由管理**：`Vue Router 4` — 支持嵌套路由与路由守卫
- **UI 组件库**：`Element Plus 2` — 按需引入 + Sass 主题定制
- **网络请求**：`Axios` — 封装拦截器，统一处理 Token 注入和错误提示
- **CSS 方案**：`Sass (SCSS)` — 变量系统 + 全局样式自动注入
- **工具库**：`VueUse` — 组合式 API 工具集（懒加载、滚动监听等）、`dayjs` 时间处理

---

## 📁 目录结构

```
vue-rabbit/
├── public/              # 静态资源
├── src/
│   ├── apis/            # 接口层：所有 Axios 请求函数（按模块拆分）
│   ├── assets/          # 图片、字体等静态资源
│   ├── components/      # 全局公共组件（如骨架屏、图片懒加载等）
│   ├── composables/     # 封装的可复用逻辑 (Hooks)
│   ├── directives/      # 自定义指令（如图片懒加载 v-lazy）
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 状态模块（用户、购物车等）
│   ├── styles/          # 全局样式 & Element Plus 主题变量覆盖
│   ├── utils/           # 工具函数（Axios 实例、Token 管理等）
│   ├── views/           # 页面组件
│   │   ├── Home/        # 首页
│   │   ├── Category/    # 一级分类页
│   │   ├── SubCategory/ # 二级分类页
│   │   ├── Detail/      # 商品详情页
│   │   ├── CartList/    # 购物车
│   │   ├── Checkout/    # 订单结算页
│   │   ├── Pay/         # 支付页
│   │   ├── Member/      # 个人中心
│   │   ├── Login/       # 登录页
│   │   └── SearchResult.vue  # 搜索结果页
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── index.html
├── vite.config.js       # Vite 构建配置（含 Element Plus 按需导入）
└── package.json
```

---

## 🚀 快速启动 (Quick Start)

### 1️⃣ 环境准备

请确保本地已安装以下环境：

| 工具 | 推荐版本 |
| --- | --- |
| Node.js | >= 16.0.0 |
| npm | >= 7.0.0 |

### 2️⃣ 安装项目依赖

```
# 克隆项目（如已在本地则跳过）
git clone https://github.com/wumih/vue-rabbit.git

# 进入项目根目录
cd vue-rabbit

# 安装依赖（请使用 npm 以保证 lock 文件的版本一致性）
npm install
```

### 3️⃣ 启动开发服务器

```
npm run dev
```

启动成功后，浏览器将自动打开 👉 **[http://localhost:3000](http://localhost:3000)**

### 4️⃣ 登录说明

> 本项目使用**前端 Mock 登录**模式，无需真实账号。

在登录页面，账号和密码随便填写即可（密码需 6-14 位）：

| 字段 | 填写要求 |
| --- | --- |
| 账号 | 任意手机号格式，如 18610848230 |
| 密码 | 任意 6-14 位字符，如 123456 |

### 5️⃣ 其他可用命令

```
npm run build    # 打包构建生产版本
npm run preview  # 预览生产构建结果
npm run lint     # ESLint 代码风格检查与自动修复
```

---

## ✨ 核心特性

- **🛒 完整购物链路**：商品浏览 → 加入购物车 → 订单结算 → 支付，全流程贯通
- **🔍 商品搜索**：支持关键词搜索并展示匹配商品列表
- **🗂️ 多级分类**：首页 → 一级分类 → 二级分类，商品体系清晰
- **🖼️ 图片懒加载**：基于 `IntersectionObserver` + 自定义指令 `v-lazy` 实现，优化首屏资源加载
- **💀 骨架屏**：数据请求期间展示占位骨架，提升视觉体验，避免空白闪烁
- **📦 状态持久化**：购物车数据和用户登录状态通过 Pinia 持久化插件写入 `localStorage`，刷新不丢失
- **🎨 主题定制**：通过 Sass 变量深度覆盖 Element Plus 默认主题色（深焙琥珀棕色系）
- **🧩 自动按需导入**：`unplugin-auto-import` + `unplugin-vue-components` 实现零手动 `import`
- **🔢 大整数兼容**：Axios `transformResponse` 层自动处理雪花算法 ID 精度问题，商品详情页全量可访问

---

## 📋 附录

- 更新日志请查看 CHANGELOG.md
- 本项目基于 **MIT License** 开源，欢迎学习交流与二次开发
