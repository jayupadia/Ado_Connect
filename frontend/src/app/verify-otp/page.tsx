import OtpVerificationForm from '../components/OtpVerificationForm'
import GradientBackground from '../components/GradientBackground'

export default function VerifyOtp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 relative overflow-hidden">
      <GradientBackground />
      <OtpVerificationForm />
    </div>
  )
}

