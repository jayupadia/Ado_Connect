'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import { verifyOTP as verifyOtpRequest } from '../api/auth'

const schema = yup.object({
  otp: yup.string().required('OTP is required').length(6, 'OTP must be 6 digits'),
}).required()

type FormData = yup.InferType<typeof schema>

export default function OtpVerificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countdown, setCountdown] = useState(120) // 5 minutes in seconds
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevCountdown - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await verifyOtpRequest(data)
      // Handle successful OTP verification, e.g., redirect to login
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const inputClasses = "w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
  const errorClasses = "mt-1 text-sm text-red-600 dark:text-red-400"

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Verify OTP</h2>
      <div className="mb-6 text-center">
        <div className="text-4xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-2">
          {formatTime(countdown)}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Time remaining to enter OTP
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="otp" className={labelClasses}>Enter OTP</label>
          <input
            type="text"
            id="otp"
            {...register('otp')}
            className={inputClasses}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
          />
          {errors.otp && <p className={errorClasses}>{errors.otp.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            type="submit"
            disabled={isSubmitting || countdown === 0}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full"
              />
            ) : (
              'Verify OTP'
            )}
          </motion.button>
        </motion.div>
      </form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Didn't receive the OTP?{' '}
          <button 
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            onClick={() => setCountdown(300)}
          >
            Resend OTP
          </button>
        </p>
      </motion.div>
    </motion.div>
  )
}
