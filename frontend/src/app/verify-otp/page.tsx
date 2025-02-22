import OtpVerificationForm from '../components/OtpVerificationForm'
import {MouseGradient} from '../components/mouse-gradient'

export default function VerifyOtp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 relative overflow-hidden">
      <MouseGradient />
      <OtpVerificationForm />
    </div>
  )
}

