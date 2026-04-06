# 🛍️ 优选商城 (YouXuan Mall)

> 一个基于 **Vue 3 全家桶**构建的现代化 B2C 电商平台前端应用

---

## 📖 项目简介

**优选商城**是一个功能完整的 B2C 电商前端项目，基于 Vue 3 Composition API 构建，涵盖商品浏览、分类筛选、搜索、购物车管理、订单结算、支付等完整业务链路。项目采用主流的工程化实践，提供流畅的用户体验与高可维护性的代码结构，适合作为 Vue3 全家桶学习与项目展示使用。

> **说明**：本项目由「小兔鲜」开源教学模板重构而来，已完成品牌视觉与文案层的全面替换，并修复了若干已知 Bug（详见 [CHANGELOG.md](./CHANGELOG.md)）。

---

## 🚀 核心亮点：性能优化与工程化落地

本项目在开发全周期深度贯彻了“性能先行”的工程化规范。依托 Chrome DevTools 与 Lighthouse 审计工具，打通了从「瓶颈侦测」到「方案落地」的数据验证闭环。

### 📊 Lighthouse 性能审计报告 (Production Mode)

针对线上环境的极端性能扫描，各项核心指标均稳居“绿区”高性能梯队：

| 核心评分 (分数越高越好) | 关键渲染指标 (时间越短越好) | 审计数据溯源 |
| :--- | :--- | :--- |
| [![Lighthouse 跑分截图](https://github.com/user-attachments/assets/0b138840-3757-4a69-a09e-020b129e058f)](https://github.com/user-attachments/assets/0b138840-3757-4a69-a09e-020b129e058f) | - **FCP**: 0.9s (绿色完美区)<br>- **LCP**: 1.7s (极速加载)<br>- **CLS**: 0.002 (零布局偏移) | [点击直接预览 ⚡ 交互报告](https://htmlpreview.github.io/?https://github.com/wumih/vue-rabbit/blob/main/lighthouse-report-after.html) |

> 👨‍💻 **技术复盘**：本项目拒绝虚假数据，所有量化结果均可回溯。
> - **在线预览**：点击上方表格右侧链接可通过 `HTMLPreview` 直接查看网页版报告。
> - **备用方案**：若预览失效，请下载仓库内的 `lighthouse-report-after.html` 并拖入 [Lighthouse Viewer](https://googlechrome.github.io/lighthouse/viewer/) 查看。

### 1. 构建打包体积降维突破 (Bundle Size)
* **痛点 (Situation)**：初始项目将框架运行时与业务代码无差别强聚合，首屏单挂载核心文件高达 **262 KB**。
* **行动 (Action)**：重写 Vite 构建拓扑，应用 `manualChunks` 策略按模块原子级解耦第三方库，并配合 `vite-plugin-compression` 生成静态 Gzip 资源。
* **结果 (Result)**：主业务代码体积从 **262 KB** 暴降至 **19.8 KB**（瘦身率达 **92%**）。
[![Bundle Tree Map](https://github.com/user-attachments/assets/b3d345dd-8c4f-4316-bcd7-ee7b48a855e6)](https://github.com/user-attachments/assets/b3d345dd-8c4f-4316-bcd7-ee7b48a855e6)

### 2. 图片资源的云端“降维打击”
* **行动 (Action)**：全面重写全局懒加载指令 `v-img-lazy` 核心逻辑，对所有外部商品图片动态注入网易云 CDN 裁剪指令 `?imageView&thumbnail=400x0&type=webp`。
* **结果 (Result)**：全局免除逐文件修改，瞬间斩断高达 **3.4 MB+** 的冗余大图流量压力。

### 3. 基于 Trace 的极致微任务压测
* **结论 (Insight)**：使用原生 Performance Trace 进行了连击 **75 次**的数据扰动洪峰测试。在连续交互场景下，单次 Task 响应均值仍被稳稳压制在 **4.2ms** 内，验证了无需引入任何“防抖”器即可保持 60fps 丝滑刷新。

---

## 🛠️ 核心技术栈

- **核心框架**：`Vue 3.2` + `Composition API`
- **构建工具**：`Vite 4`
- **状态管理**：`Pinia 2` + `pinia-plugin-persistedstate`
- **路由管理**：`Vue Router 4`
- **UI 组件库**：`Element Plus 2` — 按需引入 + Sass 主题定制
- **网络请求**：`Axios` — 封装拦截器，统一处理 Token 与雪花 ID 精度
- **CSS 方案**：`Sass (SCSS)` — 全局变量自动注入
- **工具库**：`VueUse` (组合式 API)、`dayjs` (时间处理)

---

## 📁 目录结构

```
vue-rabbit/
├── public/              # 静态资源
├── src/
│   ├── apis/            # 接口层
│   ├── assets/          # 静态资源
│   ├── components/      # 全局公共组件
│   ├── composables/     # 组合式函数
│   ├── directives/      # 自定义指令 (含 v-img-lazy 性能拦截)
│   ├── router/          # 路由配置 (含懒加载实现)
│   ├── stores/          # Pinia 数据中心
│   ├── styles/          # 全局样式 & 主题定制
│   ├── utils/           # 工具函数 (Axios 封装等)
│   ├── views/           # 页面业务组件
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── index.html
├── vite.config.js       # 构建策略配置
└── package.json
```

---

## 🚀 快速启动 (Quick Start)

### 1️⃣ 安装项目依赖
```bash
npm install
```

### 2️⃣ 启动开发服务器
```bash
npm run dev
```
> 地址 👉 **[http://localhost:3000](http://localhost:3000)**

### 3️⃣ 打包生产版本
```bash
npm run build    # 包含 Gzip 压缩与分包优化
npm run preview  # 预览性能调优后的真实生产环境分数
```

---

## ✨ 核心特性

- **🛒 完整购物链路**：商品浏览 → 加入购物车 → 订单结算 → 支付
- **️ 极致图库优化**：基于 `IntersectionObserver` 的懒加载 + 云端 WebP 自动转换
- **📦 状态持久化**：购物车数据和用户登录状态自动写入 `localStorage`
- **🧩 自动按需导入**：Element Plus 与组件库零手动 `import`
- **🔢 精度兼容**：Axios 自动处理 16 位及以上雪花算法 ID 丢失精度问题

---

## 📋 附录

- 更新日志请查看 [CHANGELOG.md](./CHANGELOG.md)
- 本项目基于 **MIT License** 开源。
