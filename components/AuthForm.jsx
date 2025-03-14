import CustomInput from "./CustomInput"


const AuthForm = ({title}) => {
  return (
    <div className="w-full flex flex-col h-screen justify-center items-center mt-[-8%] mb-[8%] overflow-x-hidden">
        {title === "sign-in" ? 
            (
                <div>
            <form className='flex flex-col items-center gap-5 '>
                <CustomInput 
                type="tel"
                placeholder="Insert your phone number"
                name="phone"
                label="Phone Number"
                />
                <CustomInput 
                type="password"
                placeholder="Insert your password"
                name="password"
                label="Password"
                />
                <button type="submit" className="btn bg-green-500 rounded-2xl w-[45%] py-0.5 text-white cursor-pointer">Get Started</button>
                </form>
                <p className="mt-3">Don't have an account ? <span className="text-green-500 cursor-pointer"><a href="/sign-in">Sign Up</a></span></p>
                </div>
            ) : (   
                <div>
                <form className='flex flex-col items-center gap-5 '>
                <CustomInput 
                type="text"
                placeholder="What is your name ?"
                name="name"
                label="Full Name"
                />
                <CustomInput 
                type="tel"
                placeholder="Insert your phone number"
                name="phone"
                label="Phone Number"
                />
                <CustomInput 
                type="password"
                placeholder="Insert your password"
                name="password"
                label="Password"
                />
                <button type="submit" className="btn bg-green-500 rounded-2xl w-[75%] py-0.5 text-white cursor-pointer">Start Tracking Now</button>
                </form>
                <p className="mt-3">Already have an account ? <span className="text-green-500 cursor-pointer"><a href="/sign-in">Sign In</a></span></p>
                </div>
            )
        }
    </div>
    )
}

export default AuthForm