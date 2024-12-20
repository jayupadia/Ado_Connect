import LoginForm from '../components/LoginForm'
import GradientBackground from '../components/GradientBackground'

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 relative overflow-hidden">
      <GradientBackground />
      <LoginForm />
    </div>
  )
}

