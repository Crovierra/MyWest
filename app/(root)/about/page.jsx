import React from 'react'

const about = () => {
  return (
    <div className='flex flex-col w-full h-full justify-center items-center pt-[9%] gap-4'>
      <div className='md:w-[50%] min-sm:w-[85%] max-sm:w-[85%] flex flex-col justify-center items-start text-start'>
      <h2 className='text-3xl font-bold mb-5'>About My WEST</h2>
      <h4 className="text-xl font-bold">Take Control of Your Finances with Ease</h4>
      <p>Managing your money shouldn't be stressful. My WEST ( Wallet Expense Tracker ) is a simple yet powerful personal finance tool designed to help you track, manage, and understand your spending habits.</p>
      <br></br>
      <h4 className="text-xl font-bold">Why Choose My WEST?</h4>
      <ul className='text-start'>
        <li><span className="font-semibold">Track Your Expenses</span> - Log your daily transactions effortlessly and categorize them for better insights.</li>
        <li><span className="font-semibold">Visualize Your Spending</span> - Get a clear breakdown of where your money is going with intuitive charts and reports.</li>
        <li><span className="font-semibold">Set Financial Goals</span> - Plan budgets, set saving goals, and keep yourself accountable.</li>
        <li><span className="font-semibold">Secure & PrivateSecure & Private</span> - Your financial data stays protected, ensuring your privacy and security.</li>
      </ul>
      <br></br>
      <h4 className="text-xl font-bold">Built for Simplicity & Efficiency</h4>
      <p>My WEST is designed for everyone, whether you're a student, professional, or anyone looking to gain better control over their finances. With a clean and user-friendly interface, tracking expenses has never been easier!</p>
      <br></br>
      <h4 className="text-xl font-bold">Start Tracking Today!</h4>
      <p>Join countless users who are taking charge of their finances with My WEST. Sign up now and make smarter financial decisions every day!</p>
      </div>
    </div>
  )
}

export default about