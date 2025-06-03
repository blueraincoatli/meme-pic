import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '电子包浆生成器',
  description: '将高清图片转换为具有复古电子包浆效果的图像',
  keywords: ['图片处理', '电子包浆', '复古效果', '图像压缩'],
  authors: [{ name: '电子包浆工作室' }],
  openGraph: {
    title: '电子包浆生成器',
    description: '将高清图片转换为具有复古电子包浆效果的图像',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="scan-line"></div>
        {children}
      </body>
    </html>
  )
} 