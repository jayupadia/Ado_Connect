'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { forgotPassword as forgotPasswordRequest } from '../api/auth'
import { toast } from 'react-hot-toast' // Import toast

const schema = yup.object({
  email: yup.string().required('Email is required').email('Must be a valid email'),
}).required()

type FormData = yup.InferType<typeof schema>

export default function ForgotPasswordForm({ onSuccess }: { onSuccess: (email: string) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await forgotPasswordRequest(data)
      toast.success('OTP sent to your email for password reset.')
      setIsSubmitted(true)
      onSuccess(data.email) // Call onSuccess with the email
    } catch{
      toast.error('Failed to send OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = "w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
  const errorClasses = "mt-1 text-sm text-red-600 dark:text-red-400"

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Check Your Email</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
        </p>
        <Link 
          href="/login" 
          className="block w-full text-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
        >
          Return to Login
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Forgot Password</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={inputClasses}
            placeholder="Enter your email"
          />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
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
              'Reset Password'
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
          Remember your password?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Log in
          </Link>
        </p>
      </motion.div>
    </motion.div>
  )
}

