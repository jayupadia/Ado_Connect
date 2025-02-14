import { Schema, model, Document } from 'mongoose';

interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // OTP expires in 10 minutes
});

export const OTP = model<IOTP>('OTP', otpSchema);

