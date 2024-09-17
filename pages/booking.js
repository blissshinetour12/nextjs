import { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    numberOfAdults: 1,
    numberOfChildren: 0,
    totalNights: 1,
    startDate: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/booking', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for booking data */}
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;
