<div align="center">

# 🛍️ 优选商城 (YouXuan Mall)

> 一个基于 **Vue 3 全家桶**构建的现代化 B2C 电商平台前端应用

[![Vue](https://img.shields.io/badge/Vue-3.2.45-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-2.0.28-F7D336?style=flat-square)](https://pinia.vuejs.org/)
[![Element Plus](https://img.shields.io/badge/Element_Plus-2.2.28-409EFF?style=flat-square)](https://element-plus.org/)
[![Axios](https://img.shields.io/badge/Axios-1.2.6-5A29E4?style=flat-square&logo=axios)](https://axios-http.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

</div>

---

## 📖 项目简介

**优选商城**是一个功能完整的 B2C 电商前端项目，基于 Vue 3 Composition API 构建，涵盖商品浏览、分类筛选、搜索、购物车管理、订单结算、支付等完整业务链路。项目采用主流的工程化实践，提供流畅的用户体验与高可维护性的代码结构，适合作为 Vue3 全家桶学习与项目展示使用。

> **说明**：本项目由「小兔鲜」开源教学模板重构而来，已完成品牌视觉与文案层的全面替换，并修复了若干已知 Bug（详见 [CHANGELOG.md](./CHANGELOG.md)）。

---

## � 核心亮点：性能优化与工程化落地

本项目在开发全周期深度贯彻了“性能先行”的工程化规范。依托 Chrome DevTools 与 Lighthouse 审计工具，打通了从「瓶颈侦测」到「方案落地」的数据验证闭环。

### 📊 Lighthouse 性能审计报告 (Production Mode)

针对线上环境的极端性能扫描，各项核心指标均稳居“绿区”高性能梯队：

| 核心评分 (分数越高越好) | 关键渲染指标 (时间越短越好) | 审计数据溯源 |
| :--- | :--- | :--- |
| [![Lighthouse 跑分截图](https://github.com/user-attachments/assets/0b138840-3757-4a69-a09e-020b129e058f)](https://github.com/user-attachments/assets/0b138840-3757-4a69-a09e-020b129e058f) | - **FCP**: 0.9s (首次主要内容绘制)<br>- **LCP**: 1.7s (最大内容渲染时长)<br>- **CLS**: 0.002 (累计布局位移) | [点此查看 ⬇️ 完整 HTML 报告](https://htmlpreview.github.io/?https://github.com/你的用户名/vue-rabbit/blob/main/localhost_4173-20260406T194042.html) |

> 👨‍💻 **技术复盘**：点击上方缩略图可查看大图。本项目配套有完整的 `.json` 源数据审计文件，开发者可随时将其导入 Lighthouse Viewer 进行全量回溯，拒绝任何虚构数据。

### 1. 构建打包体积降维突破 (Bundle Size)
* **痛点 (Situation)**：初始项目将框架运行时与业务代码无差别强聚合，首屏主 JS 包高达 **262 KB**，造成显著的弱网初始化停顿。
* **行动 (Action)**：重写 Vite 构建拓扑，应用 `manualChunks` 策略按模块原子级解耦第三方库，并配合 `vite-plugin-compression` 生成静态 Gzip 资源。
* **结果 (Result)**：主业务 JS 成功瘦身至 **19.8 KB** (压缩率高达 **92%**)，首屏 JS 预取耗时降低了约 **80%**。

### 2. 图片资源的云端“降维打击”
* **行动 (Action)**：全面侵入并重写自定义指令 `v-img-lazy` 核心逻辑，对所有外部商品图片动态注入网易云 CDN 裁剪指令 `?imageView&thumbnail=400x0&type=webp`。
* **结果 (Result)**：全局免除逐文件修改，瞬间斩断高达 **1.4 MB+** 的冗余大图流量，LCP 时间由 3.1s 暴缩至 **1.7s** 的极速水平。

### 3. 基于 Trace 的极致微任务压测
* **结论 (Insight)**：使用原生 Performance Trace 进行了连击 **75 次**的数据扰动洪峰测试。由于 Vue3 异步更新队列的高效合并，主线程单次 Task 响应均值仅为 **4.2ms**，验证了无需引入任何“防抖”器即可保持 60fps 丝滑刷新，真正实现了零玄学、纯量化的性能掌控。

---

## �🛠️ 核心技术栈

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
|---|---|
| Node.js | `>= 16.0.0` |
| npm | `>= 7.0.0` |

### 2️⃣ 安装项目依赖

```bash
# 克隆项目（如已在本地则跳过）
git clone https://github.com/wumih/vue-rabbit.git

# 进入项目根目录
cd vue-rabbit

# 安装依赖（请使用 npm 以保证 lock 文件的版本一致性）
npm install
```

### 3️⃣ 启动开发服务器

```bash
npm run dev
```

启动成功后，浏览器将自动打开 👉 **[http://localhost:3000](http://localhost:3000)**

### 4️⃣ 登录说明

> 本项目使用**前端 Mock 登录**模式，无需真实账号。

在登录页面，账号和密码随便填写即可（密码需 6-14 位）：

| 字段 | 填写要求 |
|---|---|
| 账号 | 任意手机号格式，如 `18610848230` |
| 密码 | 任意 6-14 位字符，如 `123456` |

### 5️⃣ 其他可用命令

```bash
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

- 更新日志请查看 [CHANGELOG.md](./CHANGELOG.md)
- 本项目基于 **MIT License** 开源，欢迎学习交流与二次开发
