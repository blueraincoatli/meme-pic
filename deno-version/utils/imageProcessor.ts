// 图像处理工具类
export class ImageProcessor {
  
  // 主要的电子包浆处理函数
  static async applyElectronPackaging(imageData: ArrayBuffer, fileName: string): Promise<ArrayBuffer> {
    try {
      // 方案1: 使用Sharp WebAssembly版本（如果可用）
      return await this.processWithSharp(imageData);
    } catch (error) {
      console.log('Sharp处理失败，尝试Canvas API方案');
      try {
        // 方案2: 使用浏览器Canvas API（在Edge Function中可用）
        return await this.processWithCanvas(imageData);
      } catch (canvasError) {
        console.log('Canvas处理失败，使用简化方案');
        // 方案3: 简化处理
        return await this.processSimple(imageData);
      }
    }
  }

  // 使用Sharp WebAssembly进行处理
  private static async processWithSharp(imageData: ArrayBuffer): Promise<ArrayBuffer> {
    // 这里可以集成Sharp的WebAssembly版本
    // 由于环境限制，先抛出错误让其回退到其他方案
    throw new Error('Sharp WebAssembly not available in this environment');
  }

  // 使用Canvas API处理（在某些Edge Function环境中可用）
  private static async processWithCanvas(imageData: ArrayBuffer): Promise<ArrayBuffer> {
    // 检查是否有Canvas支持
    if (typeof OffscreenCanvas === 'undefined') {
      throw new Error('OffscreenCanvas not available');
    }

    const canvas = new OffscreenCanvas(800, 600);
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('无法创建Canvas上下文');
    }

    // 创建图像对象
    const imageBlob = new Blob([imageData]);
    const imageBitmap = await createImageBitmap(imageBlob);
    
    // 设置canvas尺寸为图像尺寸
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    
    // 绘制原始图像
    ctx.drawImage(imageBitmap, 0, 0);
    
    // 应用电子包浆效果
    await this.applyPackagingEffects(ctx, canvas);
    
    // 转换为JPEG格式的Blob
    const blob = await canvas.convertToBlob({
      type: 'image/jpeg',
      quality: 0.3
    });
    
    return await blob.arrayBuffer();
  }

  // 简化处理方案
  private static async processSimple(imageData: ArrayBuffer): Promise<ArrayBuffer> {
    // 这里我们可以通过调用外部API来处理图像
    // 比如使用Cloudinary、ImageKit等服务
    
    // 对于演示版本，我们先返回原图像
    // 在实际部署时，可以集成真正的图像处理服务
    console.log('使用简化处理方案');
    return imageData;
  }

  // 应用包浆效果到Canvas
  private static async applyPackagingEffects(ctx: OffscreenCanvasRenderingContext2D, canvas: OffscreenCanvas): Promise<void> {
    const iterations = 25;
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;
    
    for (let i = 0; i < iterations; i++) {
      // 30%概率进行缩放
      if (Math.random() < 0.3) {
        const scaleFactor = 0.3 + Math.random() * 0.5;
        
        // 创建临时canvas进行缩放
        const tempCanvas = new OffscreenCanvas(
          Math.max(10, Math.floor(originalWidth * scaleFactor)),
          Math.max(10, Math.floor(originalHeight * scaleFactor))
        );
        const tempCtx = tempCanvas.getContext('2d');
        
        if (tempCtx) {
          tempCtx.imageSmoothingEnabled = false;
          tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
          
          ctx.clearRect(0, 0, originalWidth, originalHeight);
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(tempCanvas, 0, 0, originalWidth, originalHeight);
        }
      }
      
      // 应用质量降低效果
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // 添加噪声和颜色失真
      const quality = 0.05 + Math.random() * 0.65;
      for (let j = 0; j < data.length; j += 4) {
        if (Math.random() < (1 - quality)) {
          const noise = (Math.random() - 0.5) * 30;
          data[j] = Math.max(0, Math.min(255, data[j] + noise));
          data[j + 1] = Math.max(0, Math.min(255, data[j + 1] + noise));
          data[j + 2] = Math.max(0, Math.min(255, data[j + 2] + noise));
        }
        
        const quantizationLevel = Math.floor(8 * quality) + 1;
        data[j] = Math.floor(data[j] / quantizationLevel) * quantizationLevel;
        data[j + 1] = Math.floor(data[j + 1] / quantizationLevel) * quantizationLevel;
        data[j + 2] = Math.floor(data[j + 2] / quantizationLevel) * quantizationLevel;
      }
      
      ctx.putImageData(imageData, 0, 0);
    }
  }

  // 调用外部API处理图像（备用方案）
  static async processWithExternalAPI(imageData: ArrayBuffer, fileName: string): Promise<ArrayBuffer> {
    // 这里可以集成Cloudinary、Tinify等服务
    // 示例使用Cloudinary API
    
    try {
      const formData = new FormData();
      formData.append('file', new Blob([imageData]), fileName);
      formData.append('upload_preset', 'your_upload_preset'); // 需要配置
      formData.append('quality', '30');
      formData.append('format', 'jpg');
      
      // 注意：这里需要配置Cloudinary账户
      const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        // 下载处理后的图像
        const processedResponse = await fetch(result.secure_url);
        return await processedResponse.arrayBuffer();
      }
    } catch (error) {
      console.error('外部API处理失败:', error);
    }
    
    // 如果API调用失败，返回原图像
    return imageData;
  }
} 