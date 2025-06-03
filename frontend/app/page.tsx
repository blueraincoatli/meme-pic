'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Download, Zap, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react'
import ImageProcessor from './components/ImageProcessor'
import FeatureCard from './components/FeatureCard'

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "多重压缩算法",
      description: "模拟25次JPEG压缩过程，真实还原网络传播效果"
    },
    {
      icon: <ImageIcon className="h-8 w-8" />,
      title: "随机缩放伪影",
      description: "添加随机缩放和最近邻插值，产生马赛克效果"
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "即时下载",
      description: "处理完成后立即下载，支持多种图片格式"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-retro-900 to-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 glitch-text">
            电子包浆生成器
          </h1>
          <p className="text-xl md:text-2xl text-retro-200 max-w-3xl mx-auto leading-relaxed">
            将高清图片转换为具有复古电子包浆效果的劣质图像
            <br />
            <span className="text-retro-400">体验互联网早期的像素美学</span>
          </p>
        </motion.div>

        {/* Image Processor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ImageProcessor
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            processedImage={processedImage}
            setProcessedImage={setProcessedImage}
            error={error}
            setError={setError}
          />
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-retro-100">
            特色功能
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-retro-900/30 to-retro-800/30 backdrop-blur-sm rounded-2xl p-8 retro-border max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-retro-100">使用说明</h3>
            <div className="grid md:grid-cols-3 gap-6 text-retro-200">
              <div className="flex flex-col items-center">
                <div className="bg-retro-600 rounded-full p-3 mb-3">
                  <Upload className="h-6 w-6" />
                </div>
                <span className="font-semibold">1. 上传图片</span>
                <span className="text-sm text-retro-300">支持JPG、PNG等常见格式</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-retro-600 rounded-full p-3 mb-3">
                  <Zap className="h-6 w-6" />
                </div>
                <span className="font-semibold">2. 自动处理</span>
                <span className="text-sm text-retro-300">AI算法生成电子包浆效果</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-retro-600 rounded-full p-3 mb-3">
                  <Download className="h-6 w-6" />
                </div>
                <span className="font-semibold">3. 下载结果</span>
                <span className="text-sm text-retro-300">获得复古风格的劣质图像</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-retro-600/30 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-retro-300">
          <p>&copy; 2024 电子包浆生成器. 让每张图片都有故事.</p>
        </div>
      </footer>
    </div>
  )
} 