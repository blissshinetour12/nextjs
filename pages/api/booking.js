import connectDB from './db';
import Booking from './models/Booking';
import jwt from 'jsonwebtoken'; 

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    // POST method: no token authentication
    try {
      const booking = await Booking.create(req.body);
      return res.status(201).json(booking);
    } catch (error) {
      return res.status(400).json({ message: 'Error creating booking', error });
    }
  } else if (req.method === 'GET') {
    // GET method: token authentication required
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Authorization: Bearer <token>'
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verify the token
      jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch all bookings
      const bookings = await Booking.find({});
      return res.status(200).json(bookings);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
