"use client"
import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"

const Navbar = () => {
  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={150} height={150} />
      </Link>
      <div className="lg:flexCenter">
     <div onClick={()=>window.scrollTo(0, 5000)}>
     <Button 
          type="button"
          title="Contact us"
          icon="/user.svg"
          variant="btn_dark_green"
        />
     </div>
      </div>


    </nav>
  )
}

export default Navbar