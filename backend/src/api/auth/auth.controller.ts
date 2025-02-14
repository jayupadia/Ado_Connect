import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { successResponse } from "../../success-engine/response";

export class AuthController {
  static async register(req: Request, res: Response) {
    const { username, email, password, name } = req.body;
    console.log(`Register request received for email: ${email}`);
    try {
      const result = await AuthService.register({ username, email, password, name });
      successResponse(res, result, "OTP sent for registration");
    } catch (error) {
      console.error(`Register request failed for email: ${email}`, error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  }

  static async verifyOTP(req: Request, res: Response) {
    const { email, otp, registrationData } = req.body;
    console.log(`Verify OTP request received for email: ${email}, OTP: ${otp}`);
    try {
      const result = await AuthService.verifyOTP(email, otp, registrationData);
      successResponse(res, result, "User registered successfully");
    } catch (error) {
      console.error(`Verify OTP request failed for email: ${email}, OTP: ${otp}`, error);
      res.status(500).json({ message: "Failed to verify OTP" });
    }
  }

  static async login(req: Request, res: Response) {
    console.log(`Login request received for email: ${req.body.email}`);
    try {
      const result = await AuthService.login(req.body);
      successResponse(res, result, "User logged in successfully");
    } catch (error) {
      console.error(`Login request failed for email: ${req.body.email}`, error);
      res.status(500).json({ message: "Failed to login" });
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    console.log(`Forgot password request received for email: ${email}`);
    try {
      const result = await AuthService.forgotPassword(email);
      successResponse(res, result, "OTP sent for password reset");
    } catch (error) {
      console.error(`Forgot password request failed for email: ${email}`, error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    const { email, otp, newPassword } = req.body;
    console.log(`Reset password request received for email: ${email}`);
    try {
      const result = await AuthService.resetPassword(email, otp, newPassword);
      successResponse(res, result, "Password reset successfully");
    } catch (error) {
      console.error(`Reset password request failed for email: ${email}`, error);
      res.status(500).json({ message: "Failed to reset password" });
    }
  }
}

