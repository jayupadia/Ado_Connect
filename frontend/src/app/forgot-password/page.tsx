import ForgotPasswordForm from '../components/ForgotPasswordForm'
import {MouseGradient} from '../components/mouse-gradient'


export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 relative overflow-hidden">
      <MouseGradient />
      <ForgotPasswordForm />
    </div>
  )
}

