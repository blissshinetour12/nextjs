import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../app/globals.css";
import Navber from '../components/Navbar'
import Footer from '../components/Footer'
import { FaBed, FaUtensils, FaUserShield } from 'react-icons/fa';
import { FaPersonSnowboarding } from "react-icons/fa6";
import Link from 'next/link';
export default function AllToursPage() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 100000], // Default price range
    nights: 0,
    searchTitle: '', // Search by title
  });

  // Fetch all tours from the backend API
  useEffect(() => {
    const fetchTours = async () => {
      const response = await axios.get('/api/tour-packages');
      setTours(response.data);
      setFilteredTours(response.data); // Initially unfiltered
    };
    fetchTours();
  }, []);

  // Filter tours based on the filters state
  useEffect(() => {
    const filtered = tours.filter((tour) => {
      const isWithinPriceRange =
        tour.price >= filters.priceRange[0] && tour.price <= filters.priceRange[1];
      const meetsNightsCriteria = tour.numberOfNights >= filters.nights;
      const matchesTitle = tour.title
        .toLowerCase()
        .includes(filters.searchTitle.toLowerCase());

      return isWithinPriceRange && meetsNightsCriteria && matchesTitle;
    });
    setFilteredTours(filtered);
  }, [filters, tours]);

  // Update filter state based on user input
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle price range change
  const handlePriceChange = (e, index) => {
    const value = parseInt(e.target.value);
    setFilters((prev) => {
      const newRange = [...prev.priceRange];
      newRange[index] = value;
      return { ...prev, priceRange: newRange };
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      priceRange: [0, 100000],
      nights: 0,
      searchTitle: '',
    });
  };

  return (
    <>
      <Navber />
      <div className="max-w-7xl mx-auto p-4 mb-10">
        <h1 className="text-3xl font-bold mb-8">All Tour Packages</h1>

        {/* Filters Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-100 rounded-lg shadow-md">

          {/* Search by Title */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="font-bold mb-2 text-lg">Search by Title</h2>
            <input
              type="text"
              name="searchTitle"
              value={filters.searchTitle}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-lg "
              placeholder="Search tours by title"
            />
          </div>

          {/* Price Filter */}
          <div>
            <h2 className="font-bold mb-2 text-lg">Price Range</h2>
            <div className="flex space-x-2">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-full p-1 border border-gray-300 rounded-lg py-2"
                placeholder="Min Price"
                min={0}
              />
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full p-1 border border-gray-300 rounded-lg"
                placeholder="Max Price"
                min={0}
              />
            </div>
          </div>

          {/* Nights Filter */}
          <div>
            <h2 className="font-bold mb-2 text-lg">Min Nights</h2>
            <input
              type="number"
              name="nights"
              value={filters.nights}
              onChange={handleFilterChange}
              className="w-full p-1 border border-gray-300 rounded-lg py-2"
              placeholder="Minimum Nights"
              min={0}
            />
          </div>

          {/* Reset Button */}
          <div className="flex items-end justify-end">
            <button
              onClick={resetFilters}
              className="bg-red-500 text-white px-2 py-2 rounded-lg w-full">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Display Filtered Tour Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
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
                      <FaPersonSnowboarding className={`text-lg ${tour.meal ? 'text-green-500' : 'text-red-500'}`} />
                      <p className="ml-1">{tour.meal ? 'Fun' : 'No Meal'}</p>
                    </div>
                  </div>

                  {/* Number of nights */}
                  <p className="mt-2 font-semibold">{tour.numberOfNights} Nights</p>

                  {/* View More Button */}
                  <Link href={`/tourdetails/${tour.title}`}>

                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-full" onClick={() => { localStorage.setItem('id', tour._id) }}>
                      View More
                    </button></Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg font-semibold text-center w-full">
              No tours match the selected filters.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
