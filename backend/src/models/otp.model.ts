import { Schema, model, Document } from 'mongoose';

interface IOTP extends Document {
  email: string;
  otp: string;
}

const otpSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
}, { timestamps: true });

export const OTP = model<IOTP>('OTP', otpSchema);

