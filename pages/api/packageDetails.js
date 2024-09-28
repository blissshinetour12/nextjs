import TourPackage from '../api/models/TourPackage';
import connectDB from './db';

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;
  if (method === 'GET') {
    const {id} = req.query
    const tourPackages = await TourPackage.findById(id);
    return res.status(200).json(tourPackages);
  }
}
