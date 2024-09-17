"use client"
import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { GoArrowRight } from "react-icons/go";
import { SlEarphonesAlt } from "react-icons/sl";
const Navbar = () => {
  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-1">
      <Link href="/">
      <Image src="/blisslogo.svg" alt="logo" width={100} height={100} />
      </Link>
      <div className="lg:flexCenter flex flex-row lg:gap-10 gap-2">
      <div  className="flex flex-row text-green-600 cursor-pointer border border-green-600 rounded-lg w-full items-center px-4 gap-2 shadow-lg">
       
        <Link href="/AllTour" className="w-auto flex flex-row items-center">
         <p className="text-black font-semibold text-2xl">Tours</p>
        <p className="font-bold text-xl"><GoArrowRight /></p>
        </Link>
       
        
     </div>
     <div onClick={()=>window.scrollTo(0, 5000)} className="flex flex-row text-green-600 cursor-pointer bg-green-600 rounded-lg w-full items-center px-4 gap-2 shadow-lg">
        <p className="text-white font-semibold text-2xl">Contact</p>
        <p className="font-bold text-xl text-white"><SlEarphonesAlt /></p>
        
     </div>
   
      </div>


    </nav>
  )
}

export default Navbar