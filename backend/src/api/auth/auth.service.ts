import bcrypt from "bcrypt";
import { User, IUser } from "../../models/user.model";
import { OTP } from "../../models/otp.model";
import type { RegisterInput, LoginInput } from "./auth.interface";
import { BadRequestError, UnauthorizedError, InternalServerError } from "../../success-engine/error";
import { emailService } from "../../services/email.service";
import { generateToken } from '../../shared/jwt';

export class AuthService {
  static async register(input: RegisterInput) {
    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ email: input.email, otp });

    console.log(`OTP created for email: ${input.email}, OTP: ${otp}`);

    try {
      await emailService.sendOTP(input.email, otp);
      console.log(`OTP sent to email: ${input.email}`);
      return { message: "OTP sent to email for verification" };
    } catch (error) {
      console.error(`Failed to send OTP to email: ${input.email}`, error);
      throw new InternalServerError("Failed to send OTP");
    }
  }

  static async verifyOTP(email: string, otp: string, registrationData: RegisterInput) {
    console.log(`Verifying OTP for email: ${email}, OTP: ${otp}`);

    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      console.log(`No OTP record found for email: ${email}, OTP: ${otp}`);
      throw new BadRequestError("Invalid OTP");
    }

    // Delete the OTP record
    await OTP.deleteOne({ _id: otpRecord._id });

    // Create a new user with the registration data
    const user = new User({
      username: registrationData.username,
      email: registrationData.email,
      password: await bcrypt.hash(registrationData.password, 10),
      name: registrationData.name,
    });

    await user.save();

    // Send the registration data to the user's email
    try {
      await emailService.sendCredentials(email, registrationData);
      console.log(`Registration data sent to email: ${email}`);
    } catch (error) {
      console.error(`Failed to send registration data to email: ${email}`, error);
      throw new InternalServerError("Failed to send registration data");
    }

    const userId = user._id as unknown as string;
    const token = generateToken(userId);

    return { user: { id: userId, email: user.email, name: user.name, username: user.username }, token };
  }

  static async login(input: LoginInput) {
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
  }

  static async forgotPassword(email: string) {
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
      console.error(`Failed to send OTP to email: ${email}`, error);
      throw new InternalServerError("Failed to send OTP");
    }
  }

  static async verifyForgotPasswordOTP(email: string, otp: string) {
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      throw new BadRequestError("Invalid OTP");
    }

    // Delete the OTP record
    await OTP.deleteOne({ _id: otpRecord._id });

    return { message: "OTP verified successfully" };
  }

  static async resetPassword(email: string, otp: string, newPassword: string) {
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
  }
}

