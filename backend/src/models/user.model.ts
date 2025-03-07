import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  bio?: string;
  profile_picture?: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String },
  profile_picture: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const User = mongoose.model<IUser>('User', userSchema);

