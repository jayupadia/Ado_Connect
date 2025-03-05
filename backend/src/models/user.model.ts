import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  bio?: string;
  profile_picture?: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String },
  profile_picture: { type: String },
});

export const User = mongoose.model<IUser>('User', userSchema);

