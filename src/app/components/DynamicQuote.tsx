'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Playfair_Display } from 'next/font/google'
import { MessageCircle, X } from 'lucide-react'
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
  const [isQuoteVisible, setIsQuoteVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 10000) // Change quote every 10 seconds

    return () => clearInterval(quoteInterval)
  }, [])

  useEffect(() => {
    setCurrentQuote(quotes[currentIndex])
  }, [currentIndex])

  const toggleQuote = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsQuoteVisible(!isQuoteVisible)
      setIsLoading(false)
    }, 1000) // Simulate loading for 1 second
  }

  return (
    <div className="h-full flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-2xl w-full relative">
        <AnimatePresence>
          {isQuoteVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 mb-4"
            >
              <button
                onClick={toggleQuote}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
              {isLoading ? (
                <Loader />
              ) : (
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`text-2xl ${playfair.className} text-gray-800 dark:text-white text-center leading-relaxed`}
                >
                  {currentQuote}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggleQuote}
          className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors duration-300"
        >
          <MessageCircle size={32} className="text-white" />
        </button>
      </div>
    </div>
  )
}

