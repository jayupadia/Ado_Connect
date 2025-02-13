import { User, IUser } from '../models/user.model';

export class UserRepository {
  static async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  static async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }
}

