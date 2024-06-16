"use client"
import Image from 'next/image'
import Button from './Button'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="hero-map" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image 
          src="/camp.svg"
          alt="camp"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-60px] w-10 lg:w-[50px]"
        />
        <h1 className="bold-20 lg:bold-20">Discover the Magic of Kashmir: Your Ultimate Travel Adventure Awaits!</h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
        Explore the breathtaking beauty of Kashmir with our curated tours. From serene lakes and lush valleys to majestic mountains, experience the magic of this paradise on Earth. Join us for unforgettable adventures and make memories that last a lifetime!
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
            <span className="regular-16 lg:regular-20 ml-1">Excellent Reviews</span>
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row" >
        <Link href={"https://docs.google.com/forms/d/e/1FAIpQLSekzFmu9uZHoZoc_FLLZZL7xpGQVqYj8HkER5Hk4tDtQjzYOQ/viewform?usp=sf_link"}>    <Button 
      
            type="button" 
            title="Book Now" 
            variant="btn_green" 
          /> 
        </Link>
          
  
       <Link href={"tel:+91962-262-4894 "}>
       <Button 
            type="button" 
            title="+91 9622624894" 
            icon="/phone.svg"
            variant="btn_white_text" 
          />
       </Link>
         
        </div>
      </div>

      <div className="relative flex flex-1 items-start">
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