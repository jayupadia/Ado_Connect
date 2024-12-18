import { MouseGradient } from './components/mouse-gradient'
import { Features } from './components/features'
import { Hero } from './components/hero'

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-24 bg-white dark:bg-[#1a1f2e] transition-colors duration-300">
      <MouseGradient />
      <Hero />
      <Features />
    </main>
  )
}

