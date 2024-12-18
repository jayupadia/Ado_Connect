'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function MouseGradient() {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  if (!mounted) return null

  const gradientColor = theme === 'dark' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)'

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-300"
      style={{
        backgroundImage: `radial-gradient(circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 80%)`
      }}
    />
  )
}

