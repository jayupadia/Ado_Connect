import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 border-t-4 border-b-4 border-indigo-500 rounded-full"
      />
    </div>
  )
}

