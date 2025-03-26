import { MdEmail } from "react-icons/md";
import { GiGps } from "react-icons/gi";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-green-500 h-[350px] justify-center items-center flex flex-col text-white relative bottom-0 left-0 right-0">
        <div className="flex flex-row w-[80%] justify-between my-[1%] max-sm:w-[90%] max-md:flex-col">
            <div>
                <h3 className="font-bold text-4xl max-md:text-xl">Never know where your money's going ?</h3>
                <h4 className="font-normal text-xl max-md:text-sm">with My West, we help you keep track of your expenses</h4>
                <br></br>
                <p className="font-semibold text-md">My West your personal expense tracker</p>
                <p className="font-normal text-md">Never lose sight again</p>
            </div>
            <div className="flex flex-col justify-center gap-1 max-md:gap-1 max-md:mt-4">
                <div className="flex flex-row items-center gap-4"><GiGps className="text-2xl"/><a href="https://github.com/Crovierra/MyWest">https://github.com/Crovierra/MyWest</a></div>
                <div className="flex flex-row items-center gap-4"><Link href="mailto:hanskristtian.t@gmail.com"><MdEmail className="text-2xl cursor-pointer hover:opacity-90"/></Link><a href="mailto:hanskristtian.t@gmail.com">hanskristtian.t@gmail.com</a></div>
                
            </div>
        </div>
        <div className="h-[1px] w-[80%] bg-white my-[1%] max-sm:w-[90%]"></div>
        <div className="flex flex-row justify-between items-center w-[80%] max-sm:w-[90%] max-sm:flex-col max-sm:gap-4">
            <div className="flex flex-row justify-evenly items-center w-[40%] max-sm:justify-center max-md:gap-3">
            <Link href="/" className="hover:opacity-85">Home</Link>
            <Link href="/" className="hover:opacity-85">Suggestion</Link>
            <Link href="/" className="hover:opacity-85">Support</Link>
            <Link href="/" className="hover:opacity-85">About</Link>
            </div>
            <p>©Copyright 2025. All Rights Reserved</p>
        </div>
    </footer>
  )
}

export default Footer