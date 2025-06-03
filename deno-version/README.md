# 图像电子包浆工具 - Deno版

🖼️ 一个将图片处理成具有复古电子包浆效果的无服务器工具，基于Deno和Fresh框架开发。

## ✨ 特性

- 🎨 **真实电子包浆效果**：通过多次压缩和随机缩放模拟真实的图像劣化
- 🚀 **无服务器部署**：基于Deno，支持边缘计算
- 📱 **现代化界面**：响应式设计，支持拖拽上传
- ⚡ **高性能**：使用Canvas API进行图像处理
- 🔒 **类型安全**：TypeScript编写，类型安全

## 🛠️ 技术栈

- **运行时**: Deno
- **框架**: Fresh (Full-stack web framework)
- **前端**: Preact + TypeScript
- **图像处理**: Canvas API + Web APIs
- **样式**: 内联CSS（可扩展为Tailwind）

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd deno-version

# 启动开发服务器
deno task start
```

开发服务器将在 http://localhost:8000 启动

### 生产构建

```bash
# 构建项目
deno task build

# 启动生产服务器
deno task preview
```

## 📦 部署

### Deno Deploy

1. 推送代码到GitHub
2. 在 [Deno Deploy](https://dash.deno.com) 创建新项目
3. 连接GitHub仓库
4. 设置入口文件为 `main.ts`
5. 部署完成！

### Vercel

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel --platform=deno
```

## 🎯 使用方法

1. 访问网站
2. 点击上传区域或拖拽图片
3. 点击"开始电子包浆处理"
4. 等待处理完成并自动下载

## 🔧 算法说明

电子包浆算法模拟了图像多次传播和压缩的过程：

1. **随机缩放**：30%概率进行0.3-0.8倍随机缩放
2. **质量降低**：通过噪声添加和颜色量化模拟JPEG压缩
3. **迭代处理**：重复25次处理过程
4. **最终输出**：30%质量JPEG格式

## 📁 项目结构

```
deno-version/
├── routes/
│   ├── index.tsx          # 首页组件
│   └── api/
│       └── process.ts     # 图像处理API
├── main.ts               # 生产入口
├── dev.ts                # 开发入口
├── fresh.config.ts       # Fresh配置
├── deno.json            # Deno配置
└── README.md            # 项目文档
```

## 🔗 API接口

### POST /api/process

处理上传的图片文件

**请求**:
- Content-Type: multipart/form-data
- Body: file (图片文件)

**响应**:
- Content-Type: image/jpeg
- Body: 处理后的图片数据

## 🤝 贡献

欢迎提交Issue和Pull Request！

## �� 许可证

MIT License 