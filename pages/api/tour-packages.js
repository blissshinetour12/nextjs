import TourPackage from '../api/models/TourPackage';
import jwt from 'jsonwebtoken';
import connectDB from './db';

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  // No token authentication for GET method
  if (method === 'GET') {
    const tourPackages = await TourPackage.find({});
    return res.status(200).json(tourPackages);
  }

  // Token authentication for other methods
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Not authenticated' });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  if (method === 'POST') {
    const tourPackage = await TourPackage.create(req.body);
    return res.status(201).json(tourPackage);
  }

  if (method === 'PUT') {
    const { id } = req.query;
    const tourPackage = await TourPackage.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(tourPackage);
  }

  if (method === 'DELETE') {    
    const { id } = req.query;

    await TourPackage.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Deleted successfully' });
  }
}
