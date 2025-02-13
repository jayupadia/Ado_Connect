import RegisterForm from '../components/RegisterForm'
import DynamicQuote from '../components/DynamicQuote'

export default function Register() {
  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <DynamicQuote />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-white dark:bg-gray-900">
        <RegisterForm />
      </div>
    </div>
  )
}

