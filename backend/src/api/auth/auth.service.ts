import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';
import { User } from '../../models/user.model';
import { RegisterInput, LoginInput } from './auth.interface';
import { BadRequestError, UnauthorizedError, InternalServerError } from '../../success-engine/error';

export class AuthService {
  static async register(input: RegisterInput) {
    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw new BadRequestError('Email already in use');
    }

    try {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = new User({
        email: input.email,
        password: hashedPassword,
        name: input.name,
      });

      await user.save();

      const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '1d' });

      return { user: { id: user._id, email: user.email, name: user.name }, token };
    } catch (error) {
      throw new InternalServerError('Failed to create user');
    }
  }

  static async login(input: LoginInput) {
    const user = await User.findOne({ email: input.email });
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    try {
      const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '1d' });
      return { user: { id: user._id, email: user.email, name: user.name }, token };
    } catch (error) {
      throw new InternalServerError('Failed to generate token');
    }
  }
}

