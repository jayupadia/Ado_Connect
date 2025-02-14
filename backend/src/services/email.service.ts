import nodemailer from "nodemailer";
import { config } from "../config/env";
import type { RegisterInput } from "../api/auth/auth.interface";

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
      },
    });
  }

  async sendOTP(to: string, otp: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: config.EMAIL_FROM,
        to,
        subject: "Your OTP for Authentication",
        text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
        html: `<p>Your OTP is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
      });
      console.log(`OTP email sent to ${to}`);
    } catch (error) {
      console.error(`Failed to send OTP email to ${to}:`, error);
      throw error;
    }
  }

  async sendCredentials(to: string, registrationData: RegisterInput): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: config.EMAIL_FROM,
        to,
        subject: "Your Account Credentials",
        text: `Your account has been successfully created. Here are your login credentials:\n\nUsername: ${registrationData.username}\nEmail: ${registrationData.email}\nPassword: ${registrationData.password}\nName: ${registrationData.name}\n\nPlease change your password after your first login.`,
        html: `
          <h1>Your Account Credentials</h1>
          <p>Your account has been successfully created. Here are your login credentials:</p>
          <p><strong>Username:</strong> ${registrationData.username}</p>
          <p><strong>Email:</strong> ${registrationData.email}</p>
          <p><strong>Password:</strong> ${registrationData.password}</p>
          <p><strong>Name:</strong> ${registrationData.name}</p>
          <p>Please change your password after your first login.</p>
        `,
      });
      console.log(`Credentials email sent to ${to}`);
    } catch (error) {
      console.error(`Failed to send credentials email to ${to}:`, error);
      throw error;
    }
  }
}

export const emailService = new EmailService();

