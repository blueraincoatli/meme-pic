import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>图像电子包浆工具 - Deno版</title>
        <meta name="description" content="将图像处理成具有电子包浆效果的工具" />
        <style>
          {`
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 2rem;
              text-align: center;
            }
            .card {
              background: white;
              border-radius: 12px;
              padding: 2rem;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            .upload-area {
              border: 2px dashed #ddd;
              border-radius: 8px;
              padding: 2rem;
              margin: 1rem 0;
              transition: all 0.3s ease;
              cursor: pointer;
              min-height: 200px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .upload-area:hover {
              border-color: #667eea;
              background: #f8f9ff;
            }
            .upload-area.dragover {
              border-color: #667eea;
              background: #f0f2ff;
            }
            input[type="file"] {
              display: none;
            }
            .btn {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 6px;
              cursor: pointer;
              font-size: 1rem;
              transition: transform 0.2s ease;
              margin: 0.5rem;
            }
            .btn:hover:not(:disabled) {
              transform: translateY(-2px);
            }
            .btn:disabled {
              opacity: 0.6;
              cursor: not-allowed;
              transform: none;
            }
            .btn-secondary {
              background: #6c757d;
            }
            .btn-warning {
              background: #fd7e14;
            }
            .btn-small {
              padding: 0.5rem 1rem;
              font-size: 0.9rem;
            }
            .preview-container {
              display: none;
              margin: 1rem 0;
              max-height: 400px;
              overflow-y: auto;
              border: 1px solid #eee;
              border-radius: 8px;
              padding: 1rem;
            }
            .preview-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
              gap: 1rem;
              margin: 1rem 0;
            }
            .preview-item {
              position: relative;
              border: 2px solid transparent;
              border-radius: 8px;
              overflow: hidden;
              transition: border-color 0.3s ease;
            }
            .preview-item:hover {
              border-color: #667eea;
            }
            .preview-image {
              width: 100%;
              height: 120px;
              object-fit: cover;
              display: block;
            }
            .preview-name {
              padding: 0.5rem;
              background: #f8f9fa;
              font-size: 0.8rem;
              text-align: center;
              word-break: break-all;
            }
            .remove-btn {
              position: absolute;
              top: 5px;
              right: 5px;
              background: rgba(220, 53, 69, 0.9);
              color: white;
              border: none;
              border-radius: 50%;
              width: 24px;
              height: 24px;
              cursor: pointer;
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .processing {
              display: none;
              color: #667eea;
              font-weight: bold;
              margin: 1rem 0;
            }
            .file-count {
              margin: 1rem 0;
              padding: 0.5rem;
              background: #e3f2fd;
              border-radius: 6px;
              color: #1565c0;
              font-weight: bold;
            }
            .upload-instructions {
              color: #666;
              margin-bottom: 1rem;
            }
            .feature-list {
              text-align: left;
              margin: 1rem 0;
              padding: 1rem;
              background: #f8f9fa;
              border-radius: 8px;
            }
            .feature-list li {
              margin: 0.5rem 0;
            }
            .download-options {
              margin: 1rem 0;
              padding: 1rem;
              background: #fff3cd;
              border-radius: 8px;
              border: 1px solid #ffeaa7;
            }
            .radio-group {
              display: flex;
              gap: 1rem;
              justify-content: center;
              margin: 0.5rem 0;
            }
            .radio-item {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
            .alert {
              margin: 1rem 0;
              padding: 1rem;
              border-radius: 6px;
              font-weight: bold;
            }
            .alert-warning {
              background: #fff3cd;
              color: #856404;
              border: 1px solid #ffeaa7;
            }
            .alert-error {
              background: #f8d7da;
              color: #721c24;
              border: 1px solid #f1aeb5;
            }
            .alert-success {
              background: #d1e7dd;
              color: #0f5132;
              border: 1px solid #a3cfbb;
            }
            .download-list {
              margin: 1rem 0;
              padding: 1rem;
              background: #f8f9fa;
              border-radius: 8px;
            }
            .download-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0.5rem;
              margin: 0.5rem 0;
              background: white;
              border-radius: 4px;
              border: 1px solid #ddd;
            }
            .download-item.downloaded {
              background: #d1e7dd;
              border-color: #a3cfbb;
            }
          `}
        </style>
      </Head>
      <div class="container">
        <div class="card">
          <h1>🖼️ 图像电子包浆工具</h1>
          <p>将你的图片处理成具有复古电子包浆效果的样子</p>
          
          <div class="feature-list">
            <h3>✨ 功能特色：</h3>
            <ul>
              <li>📸 支持多图片批量上传</li>
              <li>🔄 真实电子包浆效果模拟</li>
              <li>📄 逐个文件下载（可靠模式）</li>
              <li>🎯 支持拖拽上传</li>
            </ul>
          </div>
          
          <form id="uploadForm" enctype="multipart/form-data">
            <div class="upload-area" id="uploadArea">
              <input type="file" id="fileInput" accept="image/*" multiple />
              <div id="uploadText">
                <p>📸 点击或拖拽图片到这里</p>
                <p class="upload-instructions">支持 JPG、PNG、GIF 等格式，可同时选择多张图片</p>
              </div>
            </div>
            
            <div class="preview-container" id="previewContainer">
              <div class="file-count" id="fileCount">已选择 0 张图片</div>
              <div class="preview-grid" id="previewGrid"></div>
              <button type="button" class="btn btn-secondary" id="clearBtn">
                🗑️ 清空所有图片
              </button>
            </div>
            
            <div class="download-options" id="downloadOptions" style="display: none;">
              <h4>📥 下载模式：</h4>
              <div class="radio-group">
                <label class="radio-item">
                  <input type="radio" name="downloadMode" value="individual" checked />
                  <span>📄 逐个文件下载（推荐）</span>
                </label>
              </div>
              <p style="font-size: 0.9em; color: #666; margin: 0.5rem 0;">
                稳定可靠的下载方式，处理完成后逐个下载图片
              </p>
            </div>
            
            <div class="processing" id="processing">
              ⏳ 正在处理图片，请稍候...
            </div>
            
            <div id="alertContainer"></div>
            
            <div id="downloadListContainer" style="display: none;">
              <div class="download-list">
                <h4>📥 处理完成，点击下载：</h4>
                <div id="downloadList"></div>
                <button type="button" class="btn btn-warning" id="downloadAllBtn">
                  📥 一键下载全部
                </button>
              </div>
            </div>
            
            <button type="submit" class="btn" id="processBtn" disabled>
              🔄 开始电子包浆处理
            </button>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          console.log('JavaScript开始执行...');
          
          // 全局变量
          let selectedFiles = [];
          let batchResult = null;
          
          // 等待DOM完全加载
          function initializeApp() {
            console.log('初始化应用程序...');
            
            // 获取DOM元素
            const fileInput = document.getElementById('fileInput');
            const uploadArea = document.getElementById('uploadArea');
            const uploadText = document.getElementById('uploadText');
            const previewContainer = document.getElementById('previewContainer');
            const previewGrid = document.getElementById('previewGrid');
            const fileCount = document.getElementById('fileCount');
            const processBtn = document.getElementById('processBtn');
            const clearBtn = document.getElementById('clearBtn');
            const processing = document.getElementById('processing');
            const uploadForm = document.getElementById('uploadForm');
            const downloadOptions = document.getElementById('downloadOptions');
            const alertContainer = document.getElementById('alertContainer');
            const downloadListContainer = document.getElementById('downloadListContainer');
            const downloadList = document.getElementById('downloadList');
            const downloadAllBtn = document.getElementById('downloadAllBtn');

            console.log('DOM元素获取结果:', {
              fileInput: !!fileInput,
              uploadArea: !!uploadArea,
              previewContainer: !!previewContainer,
              processBtn: !!processBtn
            });

            if (!fileInput || !uploadArea || !previewContainer || !processBtn) {
              console.error('关键DOM元素缺失');
              return;
            }

            // 显示提示信息
            function showAlert(message, type = 'warning') {
              const alert = document.createElement('div');
              alert.className = \`alert alert-\${type}\`;
              alert.textContent = message;
              alertContainer.innerHTML = '';
              alertContainer.appendChild(alert);
              
              setTimeout(() => {
                if (alert.parentNode) {
                  alert.remove();
                }
              }, 8000);
            }

            // 下载单个文件
            async function downloadFile(batchId, index, fileName) {
              try {
                console.log(\`下载文件: \${fileName}, 批次: \${batchId}, 索引: \${index}\`);
                const downloadUrl = \`/api/process?batch=\${encodeURIComponent(batchId)}&index=\${index}\`;
                console.log(\`下载URL: \${downloadUrl}\`);
                
                const response = await fetch(downloadUrl);
                console.log(\`下载响应状态: \${response.status}\`);
                console.log(\`下载响应头:\`, response.headers);
                
                if (response.ok) {
                  const contentType = response.headers.get('content-type');
                  console.log(\`内容类型: \${contentType}\`);
                  
                  if (contentType && contentType.includes('application/json')) {
                    // 错误响应
                    const errorData = await response.json();
                    console.error('服务器返回错误:', errorData);
                    showAlert(\`下载失败: \${errorData.error}\`, 'error');
                    return false;
                  }
                  
                  const blob = await response.blob();
                  console.log(\`Blob大小: \${blob.size} 字节\`);
                  
                  if (blob.size === 0) {
                    console.error('下载的文件为空');
                    showAlert('下载的文件为空', 'error');
                    return false;
                  }
                  
                  const url = URL.createObjectURL(blob);
                  
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = fileName;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  
                  console.log(\`成功下载: \${fileName}\`);
                  return true;
                } else {
                  console.error(\`HTTP错误: \${response.status}\`);
                  const errorText = await response.text();
                  console.error('错误详情:', errorText);
                  
                  try {
                    const errorData = JSON.parse(errorText);
                    showAlert(\`下载失败: \${errorData.error}\`, 'error');
                  } catch {
                    showAlert(\`下载失败: HTTP \${response.status}\`, 'error');
                  }
                  
                  return false;
                }
              } catch (error) {
                console.error('下载错误:', error);
                showAlert(\`下载错误: \${error.message}\`, 'error');
                return false;
              }
            }

            // 创建下载列表
            function createDownloadList(files, batchId) {
              downloadList.innerHTML = '';
              
              files.forEach((file, index) => {
                const item = document.createElement('div');
                item.className = 'download-item';
                item.innerHTML = \`
                  <span>\${file.name} (\${(file.size / 1024).toFixed(1)}KB)</span>
                  <button class="btn btn-small btn-secondary" onclick="handleSingleDownload('\${batchId}', \${index}, '\${file.name}', this)">
                    📥 下载
                  </button>
                \`;
                downloadList.appendChild(item);
              });
              
              downloadListContainer.style.display = 'block';
            }

            // 处理单个文件下载
            window.handleSingleDownload = async function(batchId, index, fileName, button) {
              const originalText = button.textContent;
              button.textContent = '⏳ 下载中...';
              button.disabled = true;
              
              const success = await downloadFile(batchId, index, fileName);
              
              if (success) {
                button.textContent = '✅ 已下载';
                button.classList.add('btn-success');
                button.parentElement.classList.add('downloaded');
                showAlert(\`\${fileName} 下载完成\`, 'success');
              } else {
                button.textContent = originalText;
                button.disabled = false;
                showAlert(\`\${fileName} 下载失败\`, 'error');
              }
            };

            // 一键下载全部
            downloadAllBtn?.addEventListener('click', async function() {
              if (!batchResult) return;
              
              downloadAllBtn.disabled = true;
              downloadAllBtn.textContent = '⏳ 下载中...';
              
              let successCount = 0;
              for (let i = 0; i < batchResult.files.length; i++) {
                const file = batchResult.files[i];
                const success = await downloadFile(batchResult.batchId, i, file.name);
                if (success) {
                  successCount++;
                  // 更新对应的下载按钮状态
                  const buttons = downloadList.querySelectorAll('button');
                  if (buttons[i]) {
                    buttons[i].textContent = '✅ 已下载';
                    buttons[i].classList.add('btn-success');
                    buttons[i].parentElement.classList.add('downloaded');
                  }
                }
                // 添加延时避免过快请求
                await new Promise(resolve => setTimeout(resolve, 200));
              }
              
              downloadAllBtn.disabled = false;
              downloadAllBtn.textContent = '📥 一键下载全部';
              
              if (successCount === batchResult.files.length) {
                showAlert(\`全部 \${successCount} 个文件下载完成！\`, 'success');
              } else {
                showAlert(\`\${successCount}/\${batchResult.files.length} 个文件下载成功\`, 'warning');
              }
            });

            // 点击上传区域
            uploadArea.addEventListener('click', function(e) {
              console.log('点击上传区域');
              fileInput.click();
            });

            // 拖拽功能
            uploadArea.addEventListener('dragover', function(e) {
              e.preventDefault();
              e.stopPropagation();
              uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', function(e) {
              e.preventDefault();
              e.stopPropagation();
              uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', function(e) {
              e.preventDefault();
              e.stopPropagation();
              uploadArea.classList.remove('dragover');
              console.log('文件拖拽放下');
              
              const files = Array.from(e.dataTransfer.files);
              console.log('拖拽文件数量:', files.length);
              handleFileSelect(files);
            });

            // 文件选择
            fileInput.addEventListener('change', function(e) {
              console.log('文件选择改变');
              const files = Array.from(e.target.files);
              console.log('选择文件数量:', files.length);
              handleFileSelect(files);
            });

            // 清空按钮
            clearBtn?.addEventListener('click', function() {
              console.log('清空文件');
              selectedFiles = [];
              batchResult = null;
              updatePreview();
              fileInput.value = '';
              alertContainer.innerHTML = '';
              downloadListContainer.style.display = 'none';
            });

            // 表单提交
            uploadForm?.addEventListener('submit', async function(e) {
              e.preventDefault();
              console.log('表单提交');
              
              if (selectedFiles.length === 0) {
                showAlert('请先选择图片！', 'error');
                return;
              }

              const formData = new FormData();
              selectedFiles.forEach(file => {
                formData.append('files', file);
              });

              // 多文件使用个别下载模式
              if (selectedFiles.length > 1) {
                formData.append('downloadType', 'individual');
              }

              processBtn.disabled = true;
              processing.style.display = 'block';
              alertContainer.innerHTML = '';
              downloadListContainer.style.display = 'none';

              try {
                console.log('发送请求...');
                const response = await fetch('/api/process', {
                  method: 'POST',
                  body: formData
                });

                console.log('服务器响应状态:', response.status);

                if (response.ok) {
                  const contentType = response.headers.get('content-type');
                  
                  if (contentType === 'application/json') {
                    // 处理JSON响应
                    const result = await response.json();
                    console.log('JSON响应:', result);
                    
                    if (result.mode === 'individual') {
                      // 个别下载模式
                      batchResult = result;
                      createDownloadList(result.files, result.batchId);
                      showAlert(\`处理完成！\${result.total}个文件已准备下载\`, 'success');
                    } else if (result.mode === 'zip_unavailable') {
                      showAlert(result.message, 'warning');
                    } else if (result.error) {
                      throw new Error(result.error);
                    }
                  } else {
                    // 处理单文件直接下载
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    
                    const filename = selectedFiles.length === 1 ? \`packaged_\${selectedFiles[0].name}\` : 'packaged_image.jpg';
                    
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    showAlert('处理完成！文件已下载。', 'success');
                  }
                } else {
                  const errorText = await response.text();
                  let errorObj;
                  try {
                    errorObj = JSON.parse(errorText);
                  } catch {
                    errorObj = { error: errorText };
                  }
                  
                  throw new Error(errorObj.error || '处理失败');
                }
              } catch (error) {
                console.error('处理错误:', error);
                showAlert(\`处理失败：\${error.message}\`, 'error');
              } finally {
                processBtn.disabled = false;
                processing.style.display = 'none';
              }
            });

            // 文件处理函数
            function handleFileSelect(newFiles) {
              console.log('处理文件选择:', newFiles.length);
              
              const imageFiles = newFiles.filter(file => {
                const isImage = file.type.startsWith('image/');
                console.log(\`文件 \${file.name} 是图片: \${isImage}\`);
                return isImage;
              });
              
              if (imageFiles.length !== newFiles.length) {
                showAlert('部分文件不是图片格式，已过滤', 'warning');
              }
              
              imageFiles.forEach(file => {
                const exists = selectedFiles.some(f => f.name === file.name && f.size === file.size);
                if (!exists) {
                  selectedFiles.push(file);
                  console.log('添加文件:', file.name);
                }
              });
              
              console.log('当前文件总数:', selectedFiles.length);
              updatePreview();
            }

            // 更新预览
            function updatePreview() {
              const count = selectedFiles.length;
              console.log('更新预览，文件数量:', count);
              
              if (count === 0) {
                previewContainer.style.display = 'none';
                downloadOptions.style.display = 'none';
                uploadText.style.display = 'block';
                processBtn.disabled = true;
                return;
              }
              
              previewContainer.style.display = 'block';
              downloadOptions.style.display = count > 1 ? 'block' : 'none';
              uploadText.style.display = 'none';
              processBtn.disabled = false;
              
              fileCount.textContent = \`已选择 \${count} 张图片\`;
              
              previewGrid.innerHTML = '';
              
              selectedFiles.forEach((file, index) => {
                console.log('创建预览:', file.name);
                
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                
                const img = document.createElement('img');
                img.className = 'preview-image';
                img.alt = file.name;
                
                const fileName = document.createElement('div');
                fileName.className = 'preview-name';
                fileName.textContent = file.name;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.innerHTML = '×';
                removeBtn.title = '删除此图片';
                removeBtn.type = 'button';
                removeBtn.addEventListener('click', function(e) {
                  e.stopPropagation();
                  console.log('删除文件:', file.name);
                  selectedFiles.splice(index, 1);
                  updatePreview();
                });
                
                const reader = new FileReader();
                reader.onload = function(e) {
                  img.src = e.target.result;
                  console.log('图片预览加载完成:', file.name);
                };
                reader.onerror = function(e) {
                  console.error('图片读取失败:', file.name);
                };
                reader.readAsDataURL(file);
                
                previewItem.appendChild(img);
                previewItem.appendChild(fileName);
                previewItem.appendChild(removeBtn);
                previewGrid.appendChild(previewItem);
              });
              
              console.log('预览更新完成');
            }

            console.log('应用程序初始化完成');
          }

          // 页面加载完成后初始化
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeApp);
          } else {
            initializeApp();
          }
        `
      }} />
    </>
  );
} 