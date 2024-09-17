"use client"
import Image from 'next/image'
import Button from './Button'
import Link from 'next/link'
import { GoArrowRight } from 'react-icons/go'

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20  pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="hero-map" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image 
          src="/camp.svg"
          alt="camp"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-60px] w-10 lg:w-[50px]"
        />
        <h1 className="bold-20 lg:bold-20">Experience the Magic of Kashmir: Affordable Adventures Await! 🌄✨</h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
        Discover Kashmir's beauty with us! 🌄 We offer the best hotels, fun activities, tasty food, and much more—all at great prices. From the peaceful Dal Lake to the green valleys, enjoy every moment. Let us make your Kashmir trip unforgettable! 🏞️🌸
        </p>

        <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5).fill(1).map((_, index) => (
              <Image 
                src="/star.svg"
                key={index}
                alt="star"
                width={24}
                height={24}
              />
            ))}
          </div>

          <p className="bold-16 lg:bold-20 text-blue-70">
            100
            <span className="regular-16 lg:regular-20 ml-1">Excellent Feedback</span>
          </p>
        </div>

        <div className="flex  w-auto gap-3 flex-row " >
        <div onClick={()=>window.scrollTo(0, 5000)} className="flex flex-row text-green-600 cursor-pointer border border-green-600 rounded-lg items-center px-4 gap-2 shadow-lg w-auto">
          
        <Link href="/AllTour" className="w-auto flex flex-row items-center">
        <p className="text-black font-semibold text-2xl">Packages</p>
        <p className="font-bold text-2xl"><GoArrowRight/></p>
        </Link>
     </div>
       <Link href={"tel:+91962-262-4894 "}>
       <Button 
            type="button" 
            title="Quick Call" 
            icon="/phone.svg"
            variant="btn_white_text" 
          />
       </Link>
         
        </div>
      </div>

      <div className="relative flex flex-1 items-start bg-[url('/road1.png')] bg-cover rounded-2xl">
        <div className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8">

           <div className="flex flex-col">
            <div className="flexBetween">
              <p className="regular-16 text-gray-20">Location</p>
            </div>
            <p className="bold-20 text-white">Kashmir</p>
          </div>

          <div className="flexBetween">
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Places</p>
              <p className="bold-20 text-white">10+</p>
            </div>
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Activities</p>
              <p className="bold-20 text-white">15+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero