'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.from(headingRef.current, {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'power3.out'
    })
    .from(subheadingRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.5')
    .from(ctaRef.current, {
      duration: 0.5,
      scale: 0.5,
      opacity: 0,
      ease: 'back.out(1.7)'
    }, '-=0.5')
  }, [])

  return (
    <div className="text-center mb-16 relative z-10">
      <h1 
        ref={headingRef} 
        className="text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100"
      >
        Welcome to Our Amazing Website
      </h1>
      <p 
        ref={subheadingRef} 
        className="text-xl text-gray-600 dark:text-gray-300 mb-8"
      >
        Discover the power of innovation and creativity
      </p>
      <button 
        ref={ctaRef} 
        className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
      >
        Get Started
      </button>
    </div>
  )
}

