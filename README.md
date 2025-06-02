# 电子包浆图像处理服务
```markdown
# 电子包浆生成器

一个给图片添加"电子包浆"效果的小工具，模拟图片经过多次转发压缩后的经典画质损失效果。

### 怎么用

1. **安装**（需要Python3）
```bash
pip install flask pillow
```

2. **运行**
```bash
python app.py
```

3. **打开浏览器访问**
```
http://localhost:5000
```

4. **上传图片** → 自动下载处理后的图片

### 效果说明
处理后的图片会具有：
- 模糊的JPEG压缩块
- 色彩失真
- 边缘锯齿
- 随机噪点

### 快捷命令
```bash
# 指定端口运行（比如想用8080端口）
python app.py --port 8080

# 用Docker运行
docker run -p 5000:5000 blueraincoatli/meme-pic
```

[>> 点此查看示例效果 <<](demo.jpg)
```
