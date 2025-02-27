'use client'

import RegisterForm from '../components/RegisterForm'
import DynamicQuote from '../components/DynamicQuote'
import OtpVerificationForm from '../components/OtpVerificationForm'
import { useState } from 'react'

export default function Register() {
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [registrationData, setRegistrationData] = useState(null)

  const handleRegistrationSuccess = (data) => {
    setRegistrationData(data)
    setShowOtpForm(true)
  }

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <DynamicQuote />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          {showOtpForm ? (
            <OtpVerificationForm registrationData={registrationData} />
          ) : (
            <RegisterForm onSuccess={handleRegistrationSuccess} />
          )}
        </div>
      </div>
    </div>
  )
}

