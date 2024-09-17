import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  numberOfAdults: Number,
  numberOfChildren: Number,
  totalNights: Number,
  startDate: Date,
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
