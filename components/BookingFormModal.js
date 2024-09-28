import { useState } from 'react';
import axios from 'axios';

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
    if (onSubmit) {
      onSubmit(formData); // Pass data to the parent
    } else {
      // Default behavior: Post to API
      await axios.post('/api/booking', formData);
    }
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          &times;
        </button>
        <h2 className="text-2xl mb-4">Book Your Stay</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Number of Adults:</label>
            <input
              type="number"
              name="numberOfAdults"
              value={formData.numberOfAdults}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div>
            <label>Number of Children:</label>
            <input
              type="number"
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div>
            <label>Total Nights:</label>
            <input
              type="number"
              name="totalNights"
              value={formData.totalNights}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
           Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingFormModal;
