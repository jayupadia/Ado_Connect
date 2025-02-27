import type { Request, Response } from "express";
import { register, login, forgotPassword, resetPassword, verifyForgotPasswordOTP, resendOTP, verifyOTP } from "./auth.service";
import { successResponse } from "../../success-engine/response";

export const registerController = async (req: Request, res: Response) => {
  const { username, email, password, name, otp } = req.body;
  try {
    const result = await register({ username, email, password, name, otp });
    if (otp) {
      successResponse(res, result, "User registered successfully");
    } else {
      successResponse(res, result, "OTP sent for registration");
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || "Failed to process request" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  console.log(`Login request received for identifier: ${req.body.identifier}`);
  try {
    const result = await login(req.body);
    successResponse(res, result, "User logged in successfully");
  } catch (error) {
    console.error(`Login request failed for identifier: ${req.body.identifier}`, error);
    res.status(500).json({ message: (error as Error).message || "Failed to login" });
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(`Forgot password request received for email: ${email}`);
  try {
    const result = await forgotPassword(email);
    successResponse(res, result, "OTP sent for password reset");
  } catch (error) {
    console.error(`Forgot password request failed for email: ${email}`, error);
    res.status(500).json({ message: (error as Error).message || "Failed to send OTP" });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  console.log(`Reset password request received for email: ${email}`);
  try {
    const result = await resetPassword(email, otp, newPassword);
    successResponse(res, result, "Password reset successfully");
  } catch (error) {
    console.error(`Reset password request failed for email: ${email}`, error);
    res.status(400).json({ message: (error as Error).message || "Failed to reset password" }); // Ensure correct status code
  }
};

export const verifyForgotPasswordOTPController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const result = await verifyForgotPasswordOTP(email, otp);
    successResponse(res, result, "OTP verified successfully");
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || "Failed to verify OTP" });
  }
};

export const resendOTPController = async (req: Request, res: Response) => {
  const { email, skipUserCheck } = req.body; // Add skipUserCheck parameter
  console.log(`Resend OTP request received for email: ${email}`);
  try {
    const result = await resendOTP(email, skipUserCheck);
    successResponse(res, result, "OTP resent successfully");
  } catch (error) {
    console.error(`Resend OTP request failed for email: ${email}`, error); // Add logging
    const typedError = error as { statusCode?: number; message?: string };
    res.status(typedError.statusCode || 500).json({ message: typedError.message || "Failed to resend OTP" });
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  const { otp, registrationData } = req.body;
  try {
    const result = await verifyOTP({ otp, registrationData });
    successResponse(res, result, "OTP verified successfully");
  } catch (error) {
    res.status(500).json({ message: (error as Error).message || "Failed to verify OTP" });
  }
};

