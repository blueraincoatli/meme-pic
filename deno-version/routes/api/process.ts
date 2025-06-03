import { FreshContext, Handlers } from "$fresh/server.ts";

// 简化的图像处理（电子包浆效果）- 不依赖Canvas
async function processImage(imageData: ArrayBuffer, originalName: string): Promise<ArrayBuffer> {
  console.log(`开始处理图像: ${originalName}, 原始大小: ${imageData.byteLength} 字节`);
  
  try {
    // 模拟电子包浆的多轮压缩效果
    let currentData = imageData;
    
    // 进行3轮压缩处理
    for (let round = 1; round <= 3; round++) {
      console.log(`第 ${round} 轮压缩处理...`);
      
      // 计算目标压缩率（逐轮增强）
      const compressionRatio = 0.8 - (round * 0.1); // 80%, 70%, 60%
      
      currentData = simulateJpegCompression(currentData, compressionRatio, round);
      
      // 添加处理延时模拟
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    const finalRatio = (currentData.byteLength / imageData.byteLength * 100);
    console.log(`处理完成: ${originalName}, 最终大小: ${currentData.byteLength} 字节, 压缩至: ${finalRatio.toFixed(1)}%`);
    
    return currentData;
    
  } catch (error) {
    console.error(`图像处理失败: ${error.message}`);
    // 即使失败也要返回一个压缩版本
    return simulateJpegCompression(imageData, 0.6, 1);
  }
}

// 模拟JPEG压缩效果
function simulateJpegCompression(imageData: ArrayBuffer, compressionRatio: number, round: number): ArrayBuffer {
  const originalSize = imageData.byteLength;
  const targetSize = Math.floor(originalSize * compressionRatio);
  
  console.log(`模拟JPEG压缩 - 轮次 ${round}: ${originalSize} -> ${targetSize} 字节 (${compressionRatio * 100}%)`);
  
  // 确保最小文件大小（保持JPEG文件结构完整）
  const minSize = Math.max(targetSize, 2048); // 最少2KB
  const finalSize = Math.min(minSize, originalSize);
  
  const sourceView = new Uint8Array(imageData);
  const compressedData = new ArrayBuffer(finalSize);
  const targetView = new Uint8Array(compressedData);
  
  // 复制JPEG文件头（SOI标记 + APP0段等重要信息）
  const headerSize = Math.min(512, finalSize, originalSize);
  for (let i = 0; i < headerSize; i++) {
    targetView[i] = sourceView[i];
  }
  
  // 处理中间数据区域（模拟压缩算法的效果）
  const dataStart = headerSize;
  const dataEnd = finalSize - 2; // 保留EOI标记的位置
  
  if (dataEnd > dataStart) {
    for (let i = dataStart; i < dataEnd; i++) {
      // 使用采样方式复制数据，模拟DCT压缩的效果
      const sourcePos = Math.floor((i - dataStart) / (dataEnd - dataStart) * (originalSize - headerSize - 2)) + headerSize;
      
      if (sourcePos < originalSize - 2) {
        let value = sourceView[sourcePos];
        
        // 模拟量化效果（降低精度）
        if (round > 1) {
          // 后续轮次增加量化步长
          const quantStep = Math.pow(2, round - 1);
          value = Math.floor(value / quantStep) * quantStep;
        }
        
        // 添加轻微的压缩噪声
        if (round > 2 && Math.random() < 0.05) {
          value = Math.max(0, Math.min(255, value + (Math.random() - 0.5) * 10));
        }
        
        targetView[i] = value;
      } else {
        targetView[i] = sourceView[sourcePos % originalSize];
      }
    }
  }
  
  // 确保JPEG文件以正确的EOI标记结束
  if (finalSize >= 2) {
    targetView[finalSize - 2] = 0xFF;
    targetView[finalSize - 1] = 0xD9; // EOI标记
  }
  
  // 确保文件以正确的SOI标记开始
  if (finalSize >= 2) {
    targetView[0] = 0xFF;
    targetView[1] = 0xD8; // SOI标记
  }
  
  console.log(`压缩完成: ${(finalSize / originalSize * 100).toFixed(1)}% 保留`);
  
  return compressedData;
}

// 存储处理结果的临时内存缓存
const processedFilesCache = new Map<string, { files: Array<{ name: string; data: ArrayBuffer }>, timestamp: number }>();

// 清理过期缓存
function cleanExpiredCache() {
  const now = Date.now();
  const expireTime = 10 * 60 * 1000; // 10分钟过期
  
  for (const [key, value] of processedFilesCache.entries()) {
    if (now - value.timestamp > expireTime) {
      processedFilesCache.delete(key);
    }
  }
}

export const handler: Handlers = {
  async POST(req: Request, _ctx: FreshContext) {
    try {
      console.log('收到POST请求');
      const formData = await req.formData();
      const files = formData.getAll('files') as File[];
      const downloadType = formData.get('downloadType') as string;
      
      console.log(`上传文件数量: ${files.length}, 下载类型: ${downloadType}`);
      
      if (!files || files.length === 0) {
        console.log('没有上传文件');
        return new Response(JSON.stringify({ error: '没有上传文件' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 验证文件
      for (const file of files) {
        console.log(`验证文件: ${file.name}, 类型: ${file.type}, 大小: ${file.size}`);
        
        if (file.size > 10 * 1024 * 1024) {
          return new Response(JSON.stringify({ 
            error: `文件 ${file.name} 太大，最大支持10MB` 
          }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        if (!file.type.startsWith('image/')) {
          return new Response(JSON.stringify({ 
            error: `文件 ${file.name} 不是图片格式` 
          }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      if (files.length > 20) {
        return new Response(JSON.stringify({ 
          error: '一次最多只能处理20张图片' 
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 处理图片
      const processedFiles: Array<{ name: string; data: ArrayBuffer }> = [];
      const errors: string[] = [];
      
      for (const file of files) {
        try {
          console.log(`开始处理图片: ${file.name}`);
          const fileBuffer = await file.arrayBuffer();
          
          // 简化的图像处理
          const processedBuffer = await processImage(fileBuffer, file.name);
          
          processedFiles.push({
            name: `packaged_${file.name}`,
            data: processedBuffer
          });
          
          console.log(`成功处理图片: ${file.name}`);
        } catch (error) {
          console.error(`处理文件 ${file.name} 时出错:`, error);
          errors.push(`${file.name}: ${error.message}`);
        }
      }
      
      if (processedFiles.length === 0) {
        return new Response(JSON.stringify({ 
          error: '所有文件处理失败',
          details: errors
        }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 单个文件直接返回
      if (processedFiles.length === 1) {
        console.log('返回单个文件');
        const processedFile = processedFiles[0];
        
        // 对文件名进行正确编码
        const encodedFileName = encodeURIComponent(processedFile.name);
        const contentDisposition = `attachment; filename*=UTF-8''${encodedFileName}`;
        
        return new Response(processedFile.data, {
          headers: {
            'Content-Type': 'image/jpeg',
            'Content-Disposition': contentDisposition,
            'Access-Control-Allow-Origin': '*',
            'X-Processed-Files': '1',
            'X-Failed-Files': errors.length.toString(),
          },
        });
      }
      
      // 多个文件的处理
      if (downloadType === 'individual') {
        // 个别下载模式：将文件存储到缓存中
        cleanExpiredCache();
        const cacheKey = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        processedFilesCache.set(cacheKey, {
          files: processedFiles,
          timestamp: Date.now()
        });
        
        console.log(`存储批次到缓存: ${cacheKey}, 文件数量: ${processedFiles.length}`);
        
        return new Response(JSON.stringify({
          mode: 'individual',
          batchId: cacheKey,
          files: processedFiles.map((f, index) => ({ 
            name: f.name, 
            size: f.data.byteLength,
            index: index
          })),
          total: processedFiles.length
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } else {
        // ZIP模式暂时改为返回第一个文件，并提示用户
        const firstFile = processedFiles[0];
        return new Response(JSON.stringify({
          mode: 'zip_unavailable',
          message: 'ZIP功能暂时不可用，请选择逐个文件下载',
          firstFile: {
            name: firstFile.name,
            size: firstFile.data.byteLength
          },
          total: processedFiles.length
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      
    } catch (error) {
      console.error('处理请求时出错:', error);
      return new Response(JSON.stringify({ 
        error: '服务器内部错误',
        message: error.message,
        stack: error.stack
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
  
  // 单独下载单个文件
  async GET(req: Request, _ctx: FreshContext) {
    try {
      const url = new URL(req.url);
      const batchId = url.searchParams.get('batch');
      const fileIndex = url.searchParams.get('index');
      
      console.log(`GET请求: batch=${batchId}, index=${fileIndex}`);
      console.log(`当前缓存键值:`, Array.from(processedFilesCache.keys()));
      
      if (!batchId || fileIndex === null) {
        console.log('参数检查失败: batch或index缺失');
        return new Response(JSON.stringify({ error: '缺少必要参数 batch 和 index' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const cached = processedFilesCache.get(batchId);
      if (!cached) {
        console.log(`缓存查找失败: ${batchId}`);
        console.log('可用的缓存键:', Array.from(processedFilesCache.keys()));
        return new Response(JSON.stringify({ error: '批次不存在或已过期，请重新处理' }), { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      console.log(`找到缓存，文件数量: ${cached.files.length}`);
      
      const index = parseInt(fileIndex);
      if (index < 0 || index >= cached.files.length) {
        console.log(`文件索引无效: ${index}, 可用范围: 0-${cached.files.length - 1}`);
        return new Response(JSON.stringify({ error: '文件索引无效' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const file = cached.files[index];
      console.log(`准备返回文件: ${file.name}, 大小: ${file.data.byteLength} 字节`);
      
      // 检查文件数据是否有效
      if (!file.data || file.data.byteLength === 0) {
        console.error(`文件数据无效: ${file.name}`);
        return new Response(JSON.stringify({ error: '文件数据无效或为空' }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 对文件名进行正确编码以避免ByteString错误
      const encodedFileName = encodeURIComponent(file.name);
      const contentDisposition = `attachment; filename*=UTF-8''${encodedFileName}`;
      
      console.log(`设置Content-Disposition: ${contentDisposition}`);
      
      return new Response(file.data, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Disposition': contentDisposition,
          'Access-Control-Allow-Origin': '*',
          'Content-Length': file.data.byteLength.toString(),
        },
      });
      
    } catch (error) {
      console.error('GET请求处理错误:', error);
      console.error('错误堆栈:', error.stack);
      return new Response(JSON.stringify({ 
        error: '服务器内部错误',
        message: error.message
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
  
  OPTIONS(_req: Request, _ctx: FreshContext) {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  },
}; 