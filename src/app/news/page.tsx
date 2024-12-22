'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import NewsArticle from '../components/NewsArticle'
import { motion } from 'framer-motion'

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastArticleRef = useRef<HTMLDivElement | null>(null)

  const fetchNews = async (pageNum: number) => {
    try {
      const response = await fetch(`/api/news?page=${pageNum}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch news')
      }

      if (!data.articles || !Array.isArray(data.articles)) {
        throw new Error('Invalid data format received from API')
      }

      return {
        articles: data.articles,
        totalResults: data.totalResults
      }
    } catch (err) {
      console.error('Error fetching news:', err)
      throw err
    }
  }

  const loadMoreArticles = useCallback(async () => {
    if (isLoadingMore) return

    try {
      setIsLoadingMore(true)
      const data = await fetchNews(page + 1)
      
      setArticles(prev => [...prev, ...data.articles])
      setPage(prev => prev + 1)
      setHasMore(articles.length + data.articles.length < data.totalResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoadingMore(false)
    }
  }, [page, isLoadingMore, articles.length])

  useEffect(() => {
    const loadInitialArticles = async () => {
      try {
        const data = await fetchNews(1)
        setArticles(data.articles)
        setHasMore(data.articles.length < data.totalResults)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialArticles()
  }, [])

  useEffect(() => {
    if (!hasMore) return

    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
        loadMoreArticles()
      }
    }, options)

    if (lastArticleRef.current) {
      observer.current.observe(lastArticleRef.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [hasMore, isLoadingMore, loadMoreArticles])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 rounded-full"
        />
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Loading news...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <h1 className="text-4xl font-bold mb-4 text-red-500">Error</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Latest News</h1>
      {articles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <div
                key={`${article.url}-${index}`}
                ref={index === articles.length - 1 ? lastArticleRef : null}
              >
                <NewsArticle {...article} />
              </div>
            ))}
          </div>
          {isLoadingMore && (
            <div className="flex justify-center mt-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 border-t-4 border-b-4 border-indigo-500 rounded-full"
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-xl text-center text-gray-600 dark:text-gray-300">No news articles available at the moment.</p>
      )}
    </div>
  )
}

