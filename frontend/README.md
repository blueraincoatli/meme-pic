# 电子包浆生成器 - 前端

这是一个现代化的Next.js前端应用，用于与Python Flask后端交互，生成电子包浆效果的图片。

## 技术栈

- **Next.js 14** - React框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **Axios** - HTTP客户端
- **Lucide React** - 图标库

## 功能特点

- 🎨 现代化响应式设计
- 🌟 流畅的动画效果
- 📱 移动端友好
- 🎯 拖拽上传支持
- ⚡ 实时图片预览
- 🔄 处理进度显示
- 📥 一键下载结果

## 本地开发

1. 安装依赖：
```bash
cd frontend
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 `http://localhost:3000`

## 部署到Vercel

1. 推送代码到GitHub仓库
2. 在Vercel中导入你的仓库
3. 设置环境变量：
   - `NEXT_PUBLIC_API_URL`: 你的Python后端URL
4. 部署完成

## 环境变量

复制 `env.example` 为 `.env.local` 并配置：

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 构建

```bash
npm run build
npm start
```

## 目录结构

```
frontend/
├── app/
│   ├── components/
│   │   ├── ImageProcessor.tsx
│   │   └── FeatureCard.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
``` 