import { Schema, model, Document } from 'mongoose';

interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date; // Add createdAt field
}

const otpSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 120 }, // Set expiration time to 2 minutes (120 seconds)
}, { timestamps: true });

export const OTP = model<IOTP>('OTP', otpSchema);

