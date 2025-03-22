import { MdEmail } from "react-icons/md";
import { GiGps } from "react-icons/gi";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-green-500 h-[350px] justify-center items-center flex flex-col text-white relative bottom-0 left-0 right-0">
        <div className="flex flex-row w-[80%] justify-between my-[1%]">
            <div>
                <h3 className="font-bold text-4xl">Never know where your money's going ?</h3>
                <h4 className="font-normal text-xl">with My West, we help you keep track of your expenses</h4>
                <br></br>
                <p className="font-semibold text-md">My West your personal expense tracker</p>
                <p className="font-normal text-md">Never lose sight again</p>
            </div>
            <div className="flex flex-col justify-center gap-4">
                <div className="flex flex-row items-center gap-4"><GiGps className="text-2xl"/><p>Lorem ipsum dolor amet street</p></div>
                <div className="flex flex-row items-center gap-4"><Link href="mailto:hanskristtian.t@gmail.com"><MdEmail className="text-2xl cursor-pointer hover:opacity-90"/></Link><p>hanskristtian.t@gmail.com</p></div>
                
            </div>
        </div>
        <div className="h-[1px] w-[80%] bg-white my-[1%]"></div>
        <div className="flex flex-row justify-between items-center w-[80%]">
            <div className="flex flex-row justify-evenly items-center w-[40%]">
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