'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Download, X, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import axios from 'axios'

interface ImageProcessorProps {
  isProcessing: boolean
  setIsProcessing: (value: boolean) => void
  processedImage: string | null
  setProcessedImage: (value: string | null) => void
  error: string | null
  setError: (value: string | null) => void
}

export default function ImageProcessor({
  isProcessing,
  setIsProcessing,
  processedImage,
  setProcessedImage,
  error,
  setError
}: ImageProcessorProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [processedFilename, setProcessedFilename] = useState<string>('')

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
      setProcessedImage(null)
    } else {
      setError('请选择有效的图片文件')
    }
  }, [setError, setProcessedImage])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files[0]) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const processImage = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/process`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 30000
        }
      )

      if (response.data.success) {
        setProcessedImage(response.data.image)
        setProcessedFilename(response.data.filename)
      } else {
        setError(response.data.error || '处理失败')
      }
    } catch (err: any) {
      console.error('处理图片时发生错误:', err)
      if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else if (err.code === 'ECONNABORTED') {
        setError('请求超时，请检查网络连接或稍后重试')
      } else if (err.response?.status === 0 || err.message.includes('Network Error')) {
        setError('无法连接到服务器，请检查后端是否正在运行')
      } else {
        setError('图片处理失败，请重试')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadImage = () => {
    if (!processedImage) return

    const link = document.createElement('a')
    link.href = processedImage
    link.download = processedFilename || 'packaged_image.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const reset = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setProcessedImage(null)
    setError(null)
    setProcessedFilename('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="h-5 w-5 text-red-400" />
            <span className="text-red-100">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Zone */}
      {!selectedFile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`upload-zone rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragOver ? 'border-retro-400 bg-retro-800/40' : ''
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-retro-600/30 rounded-full">
              <Upload className="h-12 w-12 text-retro-300" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-retro-100 mb-2">
                选择或拖拽图片
              </h3>
              <p className="text-retro-300">
                支持 JPG、PNG、WebP 等格式，最大 16MB
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
        </motion.div>
      )}

      {/* Image Preview and Processing */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Image */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-retro-100">原始图片</h3>
              <div className="relative">
                <img
                  src={previewUrl!}
                  alt="原始图片"
                  className="w-full h-64 object-cover rounded-lg retro-border"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>

            {/* Processed Image */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-retro-100">电子包浆效果</h3>
              <div className="relative h-64 bg-retro-900/20 rounded-lg retro-border flex items-center justify-center">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader className="h-8 w-8 animate-spin text-retro-400" />
                    <span className="text-retro-300">正在生成电子包浆效果...</span>
                  </div>
                ) : processedImage ? (
                  <img
                    src={processedImage}
                    alt="处理后的图片"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-retro-400">等待处理...</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={processImage}
              disabled={isProcessing || !selectedFile}
              className="retro-button rounded-lg flex items-center gap-2"
            >
              {isProcessing ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <CheckCircle className="h-5 w-5" />
              )}
              {isProcessing ? '处理中...' : '生成电子包浆'}
            </button>

            {processedImage && (
              <button
                onClick={downloadImage}
                className="bg-green-600 hover:bg-green-500 border-2 border-green-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                下载图片
              </button>
            )}

            <button
              onClick={reset}
              className="bg-gray-600 hover:bg-gray-500 border-2 border-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <X className="h-5 w-5" />
              重新选择
            </button>
          </div>

          {/* File Info */}
          <div className="text-center text-retro-300 text-sm">
            <p>文件名: {selectedFile.name}</p>
            <p>文件大小: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </motion.div>
      )}
    </div>
  )
} 