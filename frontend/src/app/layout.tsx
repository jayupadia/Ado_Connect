import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Landing Page',
  description: 'A beautiful landing page with animations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster position="top-right" containerStyle={{ top: '60px' }} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors text-gray-900 dark:text-white duration-300">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

