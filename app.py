import os
import argparse
import socket
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

def is_port_available(host, port):
    """检查端口是否可用"""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind((host, port))
            return True
    except OSError:
        return False

def find_available_port(host='127.0.0.1', start_port=5000, max_attempts=100):
    """寻找可用端口"""
    for port in range(start_port, start_port + max_attempts):
        if is_port_available(host, port):
            return port
    raise RuntimeError(f"无法在 {host} 上找到可用端口 (尝试范围: {start_port}-{start_port + max_attempts})")

if __name__ == '__main__':
    # 添加命令行参数支持
    parser = argparse.ArgumentParser(description='图像电子包浆处理工具')
    parser.add_argument('--port', type=int, default=None, help='指定端口号')
    parser.add_argument('--host', type=str, default='127.0.0.1', help='指定主机地址 (默认: 127.0.0.1)')
    parser.add_argument('--debug', action='store_true', help='启用调试模式')
    
    args = parser.parse_args()
    
    # 确定主机地址
    host = args.host
    
    # 确定端口
    if args.port:
        # 用户指定了端口，检查是否可用
        if is_port_available(host, args.port):
            port = args.port
            print(f"使用指定端口: {port}")
        else:
            print(f"警告：端口 {args.port} 不可用，正在寻找替代端口...")
            port = find_available_port(host, args.port)
            print(f"使用替代端口: {port}")
    else:
        # 没有指定端口，自动寻找可用端口
        # 优先尝试常用的开发端口
        preferred_ports = [5000, 8000, 8080, 3000, 4000]
        port = None
        
        for preferred_port in preferred_ports:
            if is_port_available(host, preferred_port):
                port = preferred_port
                break
        
        if port is None:
            port = find_available_port(host)
        
        print(f"自动选择端口: {port}")
    
    print(f"服务器启动地址: http://{host}:{port}")
    print("按 Ctrl+C 停止服务器")
    
    try:
        app.run(host=host, port=port, debug=args.debug)
    except KeyboardInterrupt:
        print("\n服务器已停止")
    except Exception as e:
        print(f"启动服务器时出错: {e}")
        print("尝试以管理员权限运行，或者使用不同的端口")