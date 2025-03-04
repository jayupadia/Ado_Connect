import bcrypt from "bcrypt";
import { User } from "../../models/user.model";
import { OTP } from "../../models/otp.model";
import type { RegisterInput, LoginInput } from "./auth.interface";
import { BadRequestError, UnauthorizedError, InternalServerError } from "../../success-engine/error";
import { emailService } from "../../services/email.service";
import { generateToken } from '../../shared/jwt';

const createUser = async (registrationData: RegisterInput) => {
  const user = new User({
    username: registrationData.username,
    email: registrationData.email,
    password: await bcrypt.hash(registrationData.password, 10),
    name: registrationData.name,
  });

  await user.save();

  const token = generateToken(user._id as unknown as string);
  return { user: { id: user._id, email: user.email, name: user.name, username: user.username }, token };
};

export const register = async (input: { username: string, email: string, password: string, name: string, otp?: string }) => {
  if (input.otp) {
    const otpRecord = await OTP.findOne({ otp: input.otp });
    if (!otpRecord) {
      throw new BadRequestError("Invalid OTP");
    }

    await OTP.deleteOne({ _id: otpRecord._id });

    return createUser(input);
  } else {
    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ email: input.email, otp });

    try {
      await emailService.sendOTP(input.email, otp);
      return { message: "OTP sent to email for verification", registrationData: input };
    } catch (error) {
      throw new InternalServerError("Failed to send OTP");
    }
  }
};

export const login = async (input: LoginInput) => {
  const user = await User.findOne({
    $or: [{ email: input.identifier }, { username: input.identifier }]
  });
  if (!user) {
    throw new UnauthorizedError("Invalid identifier or password");
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid identifier or password");
  }

  const userId = user._id as unknown as string;
  const token = generateToken(userId);
  return { user: { id: userId, email: user.email, name: user.name, username: user.username }, token };
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("User not found");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OTP.create({ email, otp });

  try {
    await emailService.sendOTP(email, otp);
    console.log(`OTP sent to email: ${email}, OTP: ${otp}`); // Add OTP to log
    return { message: "OTP sent to email for password reset" };
  } catch (error) {
    throw new InternalServerError("Failed to send OTP");
  }
};

export const verifyForgotPasswordOTP = async (email: string, otp: string) => {
  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) {
    throw new BadRequestError("Invalid OTP");
  }

  return { message: "OTP verified successfully" };
};

export const resetPassword = async (email: string, otp: string, newPassword: string) => {
  console.log(`Reset password request received for email: ${email}, OTP: ${otp}`); // Add OTP to log
  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) {
    console.log(`Invalid OTP for email: ${email}, OTP: ${otp}`); // Add OTP to log
    throw new BadRequestError("Invalid OTP");
  }

  // Delete the OTP record
  await OTP.deleteOne({ _id: otpRecord._id });

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("User not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return { message: "Password reset successfully" };
};

export const resendOTP = async (email: string, skipUserCheck = false) => {
  console.log(`Resend OTP request received for email: ${email}`); // Add logging

  if (!skipUserCheck) {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`); // Add logging
      throw new BadRequestError("User not found");
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OTP.create({ email, otp });

  try {
    await emailService.sendOTP(email, otp);
    console.log(`OTP resent to email: ${email}, OTP: ${otp}`); // Add logging
    return { message: "OTP resent to email for verification" };
  } catch (error) {
    throw new InternalServerError("Failed to resend OTP");
  }
};

export const verifyOTP = async (input: { otp: string, registrationData: RegisterInput }) => {
  const { otp, registrationData } = input;
  const otpRecord = await OTP.findOne({ otp });
  if (!otpRecord) {
    throw new BadRequestError("Invalid OTP");
  }

  const currentTime = new Date();
  const otpAge = (currentTime.getTime() - otpRecord.createdAt.getTime()) / 1000; // Calculate OTP age in seconds
  if (otpAge > 120) { // Check if OTP is older than 2 minutes
    throw new BadRequestError("OTP has expired");
  }

  await OTP.deleteOne({ _id: otpRecord._id });

  return createUser(registrationData);
};

