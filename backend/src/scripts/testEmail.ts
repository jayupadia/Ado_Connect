import { emailService } from "../services/email.service";

const testEmailSending = async () => {
  try {
    await emailService.sendOTP("test@example.com", "123456");
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Failed to send OTP email:", error);
  }
};

testEmailSending();
