"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../app/globals.css'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaBed, FaUtensils, FaUserShield } from 'react-icons/fa';
import { FaPersonSnowboarding } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
export default function TourDetails() {
  const [tourData, settourData] = useState();
  useEffect(() => {
   let id =localStorage.getItem('id')
    
    const fetchTours = async () => {
      const response = await axios.get(`/api/packageDetails/?id=${id}`);
      settourData(response.data);
    };
    fetchTours();
  }, []);

  return (
    <>
    <Navbar/>
        <div className="container mx-auto p-4 flex w-full gap-2  flex-col lg:flex-row">
      
          {/* Right side: Tour details */}
          <div className="lg:w-[70%]  space-y-8">
            {/* Tour Title and Pricing */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold">{tourData?.title}</h1>
            </div>
            {/* Image Carousel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tourData?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Tour Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
    
            {/* Day-wise Itinerary */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Day-wise Itinerary</h2>
              {tourData?.dayWiseItinerary.map((day, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold bg-blue-300 px-4">Day {day.dayNumber}</h3>
                  <p className="text-gray-700">{day.description}</p>
                </div>
              ))}
            </div>
    
            {/* Policy Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Policies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">Easy Cancellation:</h3>
                  <p>
                    31 days or more prior to departure date Initial Booking Amount will be forfeited.<br />
                    Between 30–16 days: 75% of total tour cost will be charged as penalty.<br />
                    Less than 15 days: 100% of total tour cost will be charged as penalty.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Guaranteed Dates:</h3>
                  <p>Your selected travel dates are guaranteed.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">High Season:</h3>
                  <p>Prices can fluctuate during peak season dates.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Booking Policy:</h3>
                  <p>
                    Initial Booking Amount - INR 8,000 per person or cancellation charges whichever is higher (non-refundable and non-transferable).<br />
                    30 days prior to the departure date - 50% of the remaining tour cost.<br />
                    15 days prior to the departure date - 100% of the tour cost required.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Remarks:</h3>
                  <p>Limited period offer.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[30%] lg:fixed lg:right-0 lg:top-20  flex flex-col gap-4 p-2 justify-center   lg:pt-[7rem] top-1 bg-white">
            <div className='border border-gray-500 h-auto rounded-lg  flex flex-col gap-1  shadow-lg items-center'>
              <div className='border-b-2 rounded-lg p-2 pb-4 bg-blue-100 w-full'>
              <p className='text-gray-600'>Starting from</p>
              <p className="line-through text-gray-700">₹{tourData?.price}</p>
              <p className='text-3xl font-bold flex items-center gap-2'>₹{tourData?.discountedPrice}<span className='text-sm'> per person</span></p>
              </div>
             
              <button className='w-[20rem] h-[3rem] p-2 font-bold border border-green-600 rounded-lg bg-white shadow-lg m-2 '>Submit Your query</button>
            </div>
            <div className='border border-gray-500 h-auto rounded-lg  flex flex-col gap-1  shadow-lg'>
              <div className='border-b-2 rounded-lg p-2 pb-4 '>
                <div>
                <p className='text-2xl font-bold flex items-center gap-2 mb-2'> <span><IoTimeOutline /></span> Duration :<span className='text-sm'>{tourData?.numberOfNights} Nights/ {tourData?.numberOfNights+1} Days</span></p>
                </div>
        <div className='flex items-center justify-between  flex-row'>
        <div className="flex items-center">
                  <FaBed className={`text-lg ${tourData?.hotel ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="ml-1">{tourData?.hotel ? 'Hotel' : 'No Hotel'}</p>
                </div>

                <div className="flex items-center">
                  <FaUserShield className={`text-lg ${tourData?.cap ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="ml-1">{tourData?.cap ? 'Cap' : 'No Cap'}</p>
                </div>

                <div className="flex items-center">
                  <FaUtensils className={`text-lg ${tourData?.meal ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="ml-1">{tourData?.meal ? 'Meal' : 'No Meal'}</p>
                </div>
                <div className="flex items-center">
                  <FaPersonSnowboarding  className={`text-lg ${tourData?.meal ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="ml-1">{tourData?.meal ? 'Fun' : 'No Meal'}</p>
                </div>
        </div>
              </div>
              </div>
          </div>
        </div>
    <Footer/>
    </>
  )
}
