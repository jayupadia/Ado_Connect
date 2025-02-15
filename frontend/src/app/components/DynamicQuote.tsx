'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Playfair_Display } from 'next/font/google'
import Loader from './Loader'

const playfair = Playfair_Display({ subsets: ['latin'] })

const quotes = [
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Strive not to be a success, but rather to be of value. - Albert Einstein"
]

export default function DynamicQuote() {
  const [currentQuote, setCurrentQuote] = useState('')

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 8000)

    return () => clearInterval(quoteInterval)
  }, [])

  useEffect(() => {
    setCurrentQuote(quotes[currentIndex])
  }, [currentIndex])

  return (
    <div className="h-full w-full flex items-center justify-center p-8">
      <div className="max-w-2xl w-full relative items-center flex flex-col">
        {/* Always show the animated quote div */}
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 mb-4 text-2xl ${playfair.className} text-gray-800 dark:text-white text-center leading-relaxed`}
        >
          {currentQuote}
        </motion.div>
        {/* Removed toggle button */}
      </div>
    </div>
  )
}

