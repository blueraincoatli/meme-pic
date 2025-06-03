# 电子包浆生成器

将高清图片转换为具有"电子包浆"效果的劣质图像，模拟网络传播和多次压缩造成的图像退化效果。

## 📁 项目结构

```
meme-pic/
├── frontend/          # Next.js前端 (部署到Vercel)
├── app.py            # Python Flask后端
├── requirements.txt  # Python依赖
├── templates/        # 原始HTML模板 (已弃用)
└── static/          # 静态资源
```

## 🚀 快速开始

### 后端 (Python Flask)

1. 安装Python依赖：
```bash
pip install -r requirements.txt
```

2. 启动后端服务器：
```bash
python app.py
```

后端将运行在 `http://localhost:5000`

### 前端 (Next.js)

1. 进入前端目录：
```bash
cd frontend
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

前端将运行在 `http://localhost:3000`

## 🌐 部署方案

### 后端部署选项
- **Railway**: 推荐，简单快速
- **Heroku**: 经典选择
- **Digital Ocean**: 更多控制权
- **AWS/Google Cloud**: 企业级选择

### 前端部署 (Vercel)
1. 推送代码到GitHub
2. 在Vercel中导入仓库
3. 设置环境变量 `NEXT_PUBLIC_API_URL` 为后端URL
4. 自动部署完成

## ✨ 特色功能

- 🎨 **现代化界面**: 使用Next.js + Tailwind CSS构建
- 🌟 **流畅动画**: Framer Motion动画效果
- 📱 **响应式设计**: 支持桌面和移动设备
- 🎯 **拖拽上传**: 支持拖拽文件上传
- ⚡ **实时预览**: 即时显示原图和处理结果
- 🔄 **处理进度**: 实时显示处理状态
- 📥 **一键下载**: 处理完成后立即下载

## 🔧 技术栈

### 后端
- **Python 3.8+**
- **Flask** - Web框架
- **PIL (Pillow)** - 图像处理
- **OpenCV** - 计算机视觉库
- **Flask-CORS** - 跨域支持

### 前端
- **Next.js 14** - React框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **Axios** - HTTP客户端

## 🎯 电子包浆算法

1. **多重JPEG压缩**: 25次不同质量的压缩处理
2. **随机缩放**: 模拟多次缩放造成的像素损失
3. **最近邻插值**: 产生马赛克和锯齿效果
4. **渐进质量降级**: 模拟网络传播的累积效应

## 📖 API文档

### POST /api/process
处理上传的图片并返回电子包浆效果

**请求**:
- Content-Type: multipart/form-data
- file: 图片文件

**响应**:
```json
{
  "success": true,
  "image": "data:image/jpeg;base64,/9j/4AAQ...",
  "filename": "packaged_image.jpg"
}
```

## 🔒 环境变量

### 后端
无需特殊配置

### 前端
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📋 待办事项

- [ ] 添加更多图像处理算法
- [ ] 支持批量处理
- [ ] 添加处理历史记录
- [ ] 支持自定义压缩参数
- [ ] 添加图像质量分析

## 🤝 贡献

欢迎提交Issue和Pull Request！

## �� 许可证

MIT License
