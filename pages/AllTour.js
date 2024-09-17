import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBed, FaUtensils, FaUserShield } from 'react-icons/fa';
import "../app/globals.css"
export default function AllToursPage() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    nights: 0,
    hotel: false,
    meal: false,
    cap: false,
  });

  // Fetch all tours from the backend API
  useEffect(() => {
    const fetchTours = async () => {
      const response = await axios.get('/api/tour-packages');
      setTours(response.data);
      setFilteredTours(response.data); // Set initially unfiltered
    };
    fetchTours();
  }, []);

  // Filter tours based on the filters state
  useEffect(() => {
    const filtered = tours.filter((tour) => {
      return (
        tour.price >= filters.priceRange[0] &&
        tour.price <= filters.priceRange[1] &&
        tour.numberOfNights >= filters.nights &&
        (!filters.hotel || tour.hotel) &&
        (!filters.meal || tour.meal) &&
        (!filters.cap || tour.cap)
      );
    });
    setFilteredTours(filtered);
  }, [filters, tours]);

  // Update filter state based on user input
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle price range change
  const handlePriceChange = (e, index) => {
    const value = parseInt(e.target.value);
    const newRange = [...filters.priceRange];
    newRange[index] = value;
    setFilters((prev) => ({ ...prev, priceRange: newRange }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">All Tour Packages</h1>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-100 rounded-lg shadow">
        {/* Price Filter */}
        <div>
          <h2 className="font-bold mb-2 text-lg">Price Range</h2>
          <div className="flex space-x-2">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Min Price"
            />
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Max Price"
            />
          </div>
        </div>

        {/* Nights Filter */}
        <div>
          <h2 className="font-bold mb-2 text-lg">Number of Nights</h2>
          <input
            type="number"
            name="nights"
            value={filters.nights}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Minimum Nights"
          />
        </div>

        {/* Checkbox Filters for Hotel, Meal, Cap */}
        <div className="flex flex-col space-y-4">
          <div>
            <label className="flex items-center space-x-2 text-lg">
              <input
                type="checkbox"
                name="hotel"
                checked={filters.hotel}
                onChange={handleFilterChange}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>Hotel Included</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2 text-lg">
              <input
                type="checkbox"
                name="meal"
                checked={filters.meal}
                onChange={handleFilterChange}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>Meal Included</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2 text-lg">
              <input
                type="checkbox"
                name="cap"
                checked={filters.cap}
                onChange={handleFilterChange}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>Cap Included</span>
            </label>
          </div>
        </div>
      </div>

      {/* Display Filtered Tour Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.map((tour) => (
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
              <p className="text-gray-600">Price: ${tour.price}</p>
              {tour.discountedPrice > 0 && (
                <p className="text-green-600">Discounted Price: ${tour.discountedPrice}</p>
              )}

              {/* Display features */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <FaBed className={`text-lg ${tour.hotel ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="ml-2">{tour.hotel ? 'Hotel' : 'No Hotel'}</p>
                </div>

                <div className="flex items-center">
                  <FaUserShield className={`text-lg ${tour.cap ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="ml-2">{tour.cap ? 'Cap' : 'No Cap'}</p>
                </div>

                <div className="flex items-center">
                  <FaUtensils className={`text-lg ${tour.meal ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="ml-2">{tour.meal ? 'Meal' : 'No Meal'}</p>
                </div>
              </div>

              {/* Number of nights */}
              <p className="mt-2 font-semibold">{tour.numberOfNights} Nights</p>

              {/* View More Button */}
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
