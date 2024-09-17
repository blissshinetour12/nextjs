import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password123';

export default async function handler(req, res) {
  console.log('dkjjdieioeroo');
  
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: 'Invalid email' });
  }

  const isPasswordValid = await bcrypt.compare(password, await bcrypt.hash(ADMIN_PASSWORD, 10));
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
}
