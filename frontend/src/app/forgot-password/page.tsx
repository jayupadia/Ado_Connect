'use client'

import { useState, useEffect } from 'react'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import ForgotPasswordOtpVerificationForm from '../components/ForgotPasswordOtpVerificationForm'
import ResetPasswordForm from '../components/ResetPasswordForm'
import { MouseGradient } from '../components/mouse-gradient'

export default function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  useEffect(() => {
    if (step === 1) {
      window.history.pushState(null, '', '/forgot-password')
    } else if (step === 2) {
      window.history.pushState(null, '', '/forgot-password/verify-otp')
    } else if (step === 3) {
      window.history.pushState(null, '', '/reset-password')
    }
  }, [step])

  const handleForgotPasswordSuccess = (email: string) => {
    setEmail(email)
    setStep(2)
  }

  const handleOtpVerificationSuccess = (otp: string) => {
    setOtp(otp)
    setStep(3)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 relative overflow-hidden">
      <MouseGradient />
      {step === 1 && <ForgotPasswordForm onSuccess={handleForgotPasswordSuccess} />}
      {step === 2 && <ForgotPasswordOtpVerificationForm email={email} onSuccess={handleOtpVerificationSuccess} />}
      {step === 3 && <ResetPasswordForm email={email} otp={otp} />}
    </div>
  )
}

