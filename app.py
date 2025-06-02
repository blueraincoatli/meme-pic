import os
from flask import Flask, render_template, request, send_file
from PIL import Image
import numpy as np
import cv2
import io

import random  # 用于电子包浆算法
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 限制16MB

# 确保上传目录存在
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def apply_realistic_electron_packaging(image):
    """应用真实的电子包浆效果 - 通过多次压缩和随机缩放"""
    import io  # 确保io模块可用
    original_size = image.size
    iterations = 25  # 总处理次数（压缩+缩放）
    min_quality = 5   # 最低质量
    max_quality = 70  # 最高质量
    
    for i in range(iterations):
        # 随机决定是否进行缩放（30%概率）
        if random.random() < 0.3:
            # 随机缩放比例（0.3-0.8倍）
            scale_factor = random.uniform(0.3, 0.8)
            
            # 缩小图像（使用最近邻插值 - 硬边缘）
            new_size = (
                max(10, int(original_size[0] * scale_factor)),
                max(10, int(original_size[1] * scale_factor))
            )
            small_img = image.resize(new_size, Image.NEAREST)
            
            # 放大回原始尺寸（使用最近邻插值 - 硬边缘）
            image = small_img.resize(original_size, Image.NEAREST)
        
        # 执行JPEG压缩（每次使用随机质量）
        quality = random.randint(min_quality, max_quality)
        buffer = io.BytesIO()
        image.save(buffer, format="JPEG", quality=quality)
        buffer.seek(0)
        image = Image.open(buffer)
        
        # 逐步降低最大质量（模拟多次压缩的累积效应）
        max_quality = max(min_quality, max_quality - 2)
    
    return image

@app.route('/', methods=['GET'])
def index():
    """显示上传页面"""
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process_image():
    """处理上传的图片"""
    if 'file' not in request.files:
        return "没有上传文件", 400
    
    file = request.files['file']
    if file.filename == '':
        return "未选择文件", 400
    
    # 读取图片
    img = Image.open(file.stream)
    
    # 应用电子包浆效果
    processed_img = apply_realistic_electron_packaging(img)
    
    # 保存处理后的图片
    output_buffer = io.BytesIO()
    processed_img.save(output_buffer, format="JPEG", quality=30)
    output_buffer.seek(0)
    
    return send_file(
        output_buffer,
        mimetype='image/jpeg',
        as_attachment=True,
        download_name=f'packaged_{file.filename}'
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=58034, debug=True)