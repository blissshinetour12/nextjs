import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit, FaCloudUploadAlt } from 'react-icons/fa';
import '../app/globals.css';
const AdminDashboard = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    discountedPrice: 0,
    dayWiseItinerary: [{ dayNumber: 1, description: '' }],
    hotel: false,
    cap: false,
    meal: false,
    numberOfNights: 0,
    images: [],
  });
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    // Fetch all tour packages and bookings
    const fetchData = async () => {
      console.log('----');
      try {
        const [packagesResponse, bookingsResponse] = await Promise.all([
          axios.get('/api/tour-packages'),
          axios.get('/api/booking', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
        ]);


        setTourPackages(packagesResponse.data);
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle image upload via Cloudinary
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    formData.append('file', files[0]);
    formData.append('upload_preset', 'p6zgj0g3'); // Add your Cloudinary upload preset

    setImageUploading(true);

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/db7doldk8/image/upload',
        formData
      );

      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, response.data.secure_url],
      }));
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      setImageUploading(false);
    }
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle itinerary change
  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...formData.dayWiseItinerary];
    newItinerary[index][field] = value;
    setFormData((prevData) => ({ ...prevData, dayWiseItinerary: newItinerary }));
  };

  const addNewDay = () => {
    setFormData((prevData) => ({
      ...prevData,
      dayWiseItinerary: [...prevData.dayWiseItinerary, { dayNumber: prevData.dayWiseItinerary.length + 1, description: '' }],
    }));
  };

  // Handle create/update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        // Update the package
        await axios.put(`/api/tour-packages/?id=${editingPackage._id}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        // Create a new package
        await axios.post('/api/tour-packages', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }

      // Reset form and refresh data
      setFormData({
        title: '',
        price: 0,
        discountedPrice: 0,
        dayWiseItinerary: [{ dayNumber: 1, description: '' }],
        hotel: false,
        cap: false,
        meal: false,
        numberOfNights: 0,
        images: [],
      });
      setEditingPackage(null);
      // Fetch updated packages
      const response = await axios.get('/api/tour-packages');
      setTourPackages(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Handle edit
  const handleEdit = (pkg) => {
    setFormData(pkg);
    setEditingPackage(pkg);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tour-packages/?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      // Fetch updated packages
      const response = await axios.get('/api/tour-packages');
      setTourPackages(response.data);
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Tour Packages & Bookings</h1>

      {/* Form for adding/editing tour packages */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold">{editingPackage ? 'Edit Tour Package' : 'Add Tour Package'}</h2>

        {/* Tour Package Form Fields */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Discounted Price</label>
            <input
              type="number"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        {/* Itinerary */}
        <div>
          <label className="block font-semibold mb-1">Day Wise Itinerary</label>
          {formData.dayWiseItinerary.map((day, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="number"
                value={day.dayNumber}
                onChange={(e) => handleItineraryChange(index, 'dayNumber', e.target.value)}
                className="p-2 border rounded w-20"
                placeholder="Day"
                required
              />
              <input
                type="text"
                value={day.description}
                onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Description"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addNewDay}
            className="mt-2 text-blue-600 underline"
          >
            Add New Day
          </button>
        </div>

        {/* Hotel, Cap, Meal */}
        <div className="flex items-center space-x-4">
          <div>
            <label className="block font-semibold mb-1">Hotel</label>
            <input
              type="checkbox"
              name="hotel"
              checked={formData.hotel}
              onChange={handleChange}
              className="p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Cap</label>
            <input
              type="checkbox"
              name="cap"
              checked={formData.cap}
              onChange={handleChange}
              className="p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Meal</label>
            <input
              type="checkbox"
              name="meal"
              checked={formData.meal}
              onChange={handleChange}
              className="p-2"
            />
          </div>
        </div>

        {/* Number of Nights */}
        <div>
          <label className="block font-semibold mb-1">Number of Nights</label>
          <input
            type="number"
            name="numberOfNights"
            value={formData.numberOfNights}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Upload Images</label>
          <input type="file" onChange={handleImageUpload} className="w-full p-2 border rounded" />
          {imageUploading && <p>Uploading...</p>}
          {formData.images.length > 0 && (
            <div className="flex space-x-2 mt-2">
              {formData.images.map((img, idx) => (
                <img key={idx} src={img} alt="uploaded" className="h-20 w-20 object-cover" />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          {editingPackage ? 'Update Package' : 'Add Package'}
        </button>
      </form>

      {/* Displaying Tour Packages */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Tour Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tourPackages.map((pkg) => (
            <div key={pkg._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold">{pkg.title}</h3>
              <p>Price: {pkg.price}</p>
              <p>Discounted Price: {pkg.discountedPrice}</p>
              <p>Nights: {pkg.numberOfNights}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="bg-blue-500 text-white py-1 px-3 rounded flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => {confirm("you want to delete it")==true ?handleDelete(pkg._id):null}}
                  className="bg-red-500 text-white py-1 px-3 rounded flex items-center"
                >
                  <FaTrashAlt className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Displaying Bookings */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Bookings</h2>
        <div className="bg-white p-4 rounded shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Name</th>
                <th className="border-b p-2 text-left">Email</th>
                <th className="border-b p-2 text-left">Contact</th>
                <th className="border-b p-2 text-left">Number of Adults</th>
                <th className="border-b p-2 text-left">Children</th>
                <th className="border-b p-2 text-left">Total Nights</th>
                <th className="border-b p-2 text-left">Start Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border-b p-2">{booking.name}</td>
                  <td className="border-b p-2">{booking.email}</td>
                  <td className="border-b p-2">{booking.contact}</td>
                  <td className="border-b p-2">{booking.numberOfAdults}</td>
                  <td className="border-b p-2">{booking.numberOfChildren}</td>
                  <td className="border-b p-2">{booking.totalNights}</td>
                  <td className="border-b p-2">{booking.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
