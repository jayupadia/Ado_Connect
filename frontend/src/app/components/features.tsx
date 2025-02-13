'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Features() {
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!featuresRef.current) return

    gsap.from(featuresRef.current.children, {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out'
    })
  }, [])

  return (
    <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl relative z-10">
      {[
        { title: 'Feature 1', description: 'Amazing feature that will blow your mind' },
        { title: 'Feature 2', description: 'Incredible functionality you can\'t live without' },
        { title: 'Feature 3', description: 'Revolutionary tool to boost your productivity' }
      ].map((feature, index) => (
        <div 
          key={index} 
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">{feature.title}</h2>
          <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

