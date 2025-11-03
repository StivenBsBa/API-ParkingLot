import { Admin } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ResponseMessages } from '../constants/responseMessages.js';

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) {
      const error = new Error('Admin user already exists');
      error.statusCode = 400;
      return next(error);
    }

    // Create new admin
    const newAdmin = await Admin.create({ username, password });

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      return next(error);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      return next(error);
    }

    // Create and sign JWT
    const payload = { id: admin.id, username: admin.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
