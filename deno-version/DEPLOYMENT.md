# 部署指南

## 🚀 Deno版本部署方案

### 📋 解决的问题

1. ✅ **OffscreenCanvas错误** - 使用多重回退方案
2. ✅ **多图片上传** - 支持批量处理
3. ✅ **图像居中显示** - 现代化响应式界面
4. ✅ **压缩包下载** - 自动打包多个文件
5. ✅ **错误处理** - 完善的错误提示和日志

### 🎯 功能特色

- 📸 **多图片批量上传**（最多20张，每张最大10MB）
- 🔄 **智能图像处理**（多重回退方案）
- 📦 **自动打包下载**（ZIP格式）
- 🎨 **现代化界面**（拖拽上传、预览网格）
- ⚡ **高性能处理**（异步并发）

## 🛠️ 本地测试

### Windows系统

```powershell
# 1. 安装Deno
irm https://deno.land/install.ps1 | iex

# 2. 重启PowerShell，验证安装
deno --version

# 3. 进入项目目录
cd deno-version

# 4. 启动开发服务器
deno task start
```

### macOS/Linux系统

```bash
# 1. 安装Deno
curl -fsSL https://deno.land/install.sh | sh

# 2. 添加到PATH
export PATH="$HOME/.deno/bin:$PATH"

# 3. 进入项目目录
cd deno-version

# 4. 启动开发服务器
deno task start
```

## 🌐 部署到无服务器平台

### 1. Deno Deploy（推荐）

**优势：**
- ✅ 官方平台，零配置
- ✅ 全球边缘部署
- ✅ 免费额度丰富
- ✅ 自动扩展

**步骤：**

1. 推送代码到GitHub
2. 访问 [Deno Deploy](https://dash.deno.com)
3. 连接GitHub仓库
4. 设置入口文件：`main.ts`
5. 部署完成！

### 2. Vercel

**优势：**
- ✅ 支持Deno运行时
- ✅ 全球CDN
- ✅ 自动SSL
- ✅ 简单配置

**步骤：**

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel --platform=deno
```

或者直接在Vercel仪表板中连接GitHub仓库。

### 3. Netlify

**步骤：**

1. 在项目根目录创建 `netlify.toml`：

```toml
[build]
  command = "deno task build"
  publish = "_fresh"

[[redirects]]
  from = "/*"
  to = "/main.ts"
  status = 200
```

2. 在Netlify中连接GitHub仓库

## 🔧 配置选项

### 环境变量

```bash
# 可选：Cloudinary配置（用于更强大的图像处理）
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 自定义配置

在 `fresh.config.ts` 中可以调整：

```typescript
export default defineConfig({
  server: {
    port: 8000, // 端口设置
  },
  // 其他配置...
});
```

## 📊 性能优化

### 1. 图像处理优化

- **分层处理**：Canvas API → WebAssembly → 外部API
- **错误恢复**：处理失败时优雅降级
- **内存管理**：及时释放大文件内存

### 2. 文件限制

- **单文件大小**：最大10MB
- **批量数量**：最多20张图片
- **支持格式**：JPG, PNG, GIF, WebP

### 3. 缓存策略

```typescript
// 可以添加缓存头
headers: {
  'Cache-Control': 'public, max-age=31536000',
  // ...
}
```

## 🐛 常见问题解决

### 1. OffscreenCanvas错误

**解决方案**：代码已实现多重回退
- Canvas API → 简化处理 → 外部API

### 2. 内存不足

**解决方案**：
- 减少批量处理数量
- 压缩图片尺寸
- 使用流式处理

### 3. 部署失败

**检查清单**：
- [ ] Deno版本兼容性
- [ ] 入口文件路径正确
- [ ] 环境变量配置
- [ ] 依赖项导入路径

## 📈 监控和日志

### 开发环境

```bash
# 查看详细日志
deno task start --log-level=debug
```

### 生产环境

部署平台提供的监控工具：
- **Deno Deploy**：内置监控面板
- **Vercel**：Functions日志
- **Netlify**：Function logs

## 🔄 更新和维护

### 更新依赖

```bash
# 更新Fresh框架
deno task update

# 检查类型
deno task check
```

### 性能测试

```bash
# 本地性能测试
deno run --allow-net --allow-read test_performance.ts
```

## 📞 技术支持

如果遇到问题：

1. 查看 [Fresh文档](https://fresh.deno.dev/)
2. 检查 [Deno Deploy状态](https://status.deno.dev/)
3. 查看项目Issue和讨论

---

**现在你的图像电子包浆工具已经完全支持无服务器部署了！** 🎉 