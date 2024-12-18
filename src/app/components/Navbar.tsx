'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <nav className="w-full border-b border-gray-800 bg-white dark:bg-[#1a1f2e] transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
          </div>
          
          <div className="hidden space-x-8 md:flex">
            <Link href="/" className="text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/contact" className="text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link href="/about" className="text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/blogs" className="text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors">
              Blogs
            </Link>
            <Link href="/news" className="text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors">
              News
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Register
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

