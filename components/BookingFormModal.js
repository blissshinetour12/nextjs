import { useState } from 'react';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
const BookingFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name:  '',
    contact:  '',
    email:  '',
    numberOfAdults:  1,
    numberOfChildren: 0,
    totalNights:  1,
    startDate:  '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      // Default behavior: Post to API
      await axios.post('/api/booking', formData);
      alert('Your query submited successfully')
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-8 rounded-lg shadow-lg absolute z-100">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl hover:shadow-lg">
        <IoMdClose />
        </button>
        <h2 className="text-2xl mb-4">Book Your Stay</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Contact:</label>
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Adults:</label>
      <input
        type="number"
        name="numberOfAdults"
        value={formData.numberOfAdults}
        onChange={handleChange}
        min="1"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Children:</label>
      <input
        type="number"
        name="numberOfChildren"
        value={formData.numberOfChildren}
        onChange={handleChange}
        min="0"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Total Nights:</label>
      <input
        type="number"
        name="totalNights"
        value={formData.totalNights}
        onChange={handleChange}
        min="1"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date:</label>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>

  <button
    type="submit"
    className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    Submit
  </button>
</form>

      </div>
    </div>
  );
};

export default BookingFormModal;
