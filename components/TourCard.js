"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBed, FaUtensils, FaUserShield } from 'react-icons/fa';
import { FaPersonSnowboarding } from "react-icons/fa6";
import Link from 'next/link';
export default function TourCard() {
  const [tours, setTours] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Fetch all tours from the backend API
  useEffect(() => {
    const fetchTours = async () => {
      const response = await axios.get('/api/tour-packages');
      setTours(response.data);
    };
    fetchTours();
  }, []);

  // Toggle between showing four or all tours
  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  // Show only the first four tours if not showing all
  const toursToDisplay = showAll ? tours : tours.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 w-full text-center border-b-2">Our Best Packages</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {toursToDisplay.map((tour) => (
          <div key={tour._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Image */}
            <img
              src={tour.images[0]}
              alt={tour.title}
              className="h-40 w-full object-cover"
            />

            {/* Tour Info */}
            <div className="p-4">
              <h2 className="text-lg font-bold">{tour.title}</h2>
              <p className="text-gray-600 ">Price: ₹<span className='line-through'>{tour.price}</span> </p>
              {tour.discountedPrice > 0 && (
                <p className="">Discounted Price: <span className=' text-green-600'> ₹ {tour.discountedPrice}</span>/Adult</p>
              )}

              {/* Display features */}
              <div className="flex items-center justify-between mt-4 gap-2">
                <div className="flex items-center">
                  <FaBed className={`text-lg ${tour.hotel ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="ml-1">{tour.hotel ? 'Hotel' : 'No Hotel'}</p>
                </div>

                <div className="flex items-center">
                  <FaUserShield className={`text-lg ${tour.cap ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="ml-1">{tour.cap ? 'Cap' : 'No Cap'}</p>
                </div>

                <div className="flex items-center">
                  <FaUtensils className={`text-lg ${tour.meal ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="ml-1">{tour.meal ? 'Meal' : 'No Meal'}</p>
                </div>
                <div className="flex items-center">
                  <FaPersonSnowboarding  className={`text-lg ${tour.meal ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="ml-1">{tour.meal ? 'Fun' : 'No Meal'}</p>
                </div>
              </div>

              {/* Number of nights */}
              <p className="mt-2 font-semibold">{tour.numberOfNights} Nights</p>

              {/* View More Button */}
              <Link href={`/tourdetails/${tour.title}`}>

               <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-full" onClick={()=>{localStorage.setItem('id',tour._id)}}>
                View More
              </button></Link>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      {tours.length > 4 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleShowAll}
            className="bg-green-500 text-white px-6 py-3 rounded-lg"
          >
            {showAll ? 'Show Less' : 'Show All Packages'}
          </button>
        </div>
      )}
    </div>
  );
}
