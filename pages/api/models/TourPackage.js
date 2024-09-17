import mongoose from 'mongoose';

const TourPackageSchema = new mongoose.Schema({
  title: String,
  price: Number,
  discountedPrice: Number,
  dayWiseItinerary: [
    {
      dayNumber: Number,
      description: String,
    },
  ],
  hotel: Boolean,
  cap: Boolean,
  meal: Boolean,
  numberOfNights: Number,
  images: [String],
});

export default mongoose.models.TourPackage || mongoose.model('TourPackage', TourPackageSchema);
