'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface NewsArticleProps {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
}

export default function NewsArticle({ title, description, url, urlToImage, publishedAt, source }: NewsArticleProps) {
  const [imageError, setImageError] = useState(false)
  const defaultImage = 'https://placehold.co/600x400?text=No+Image'

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48 w-full">
        <img
          src={imageError ? defaultImage : (urlToImage || defaultImage)}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white line-clamp-2">{title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>
        </div>
        <div>
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span>{new Date(publishedAt).toLocaleDateString()}</span>
            <span>{source.name}</span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 text-sm"
          >
            Read More
          </a>
        </div>
      </div>
    </motion.div>
  )
}

