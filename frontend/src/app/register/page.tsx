import RegisterForm from '../components/RegisterForm'
import DynamicQuote from '../components/DynamicQuote'

export default function Register() {
  return (
    // Outer container centered with full screen height
    <div className="h-[90vh] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      {/* Card container with increased width and auto height */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <DynamicQuote />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

