import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const generateToken = (userId: string): string => {
  if (!config.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string): any => {
  if (!config.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.verify(token, config.JWT_SECRET);
};

