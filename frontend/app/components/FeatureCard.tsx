'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-gradient-to-br from-retro-900/40 to-retro-800/40 backdrop-blur-sm rounded-2xl p-6 retro-border group cursor-pointer"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-retro-600/30 rounded-full group-hover:bg-retro-500/40 transition-colors duration-300">
          <div className="text-retro-300 group-hover:text-retro-200 transition-colors duration-300">
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-retro-100 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-retro-300 group-hover:text-retro-200 transition-colors duration-300 leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-retro-600/10 to-retro-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
} 