import { Router } from "express";
import { registerController, loginController, forgotPasswordController, resetPasswordController, verifyForgotPasswordOTPController, resendOTPController, verifyOTPController } from "./auth.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, verifyForgotPasswordOTPSchema, verifyOTPSchema } from "./auth.schema";

const router = Router();

router.post("/register", validationMiddleware(registerSchema), registerController);
router.post("/login", validationMiddleware(loginSchema), loginController);
router.post("/forgot-password", validationMiddleware(forgotPasswordSchema), forgotPasswordController);
router.post("/reset-password", validationMiddleware(resetPasswordSchema), resetPasswordController);
router.post("/verify-forgot-password-otp", validationMiddleware(verifyForgotPasswordOTPSchema), verifyForgotPasswordOTPController);
router.post("/resend-otp", resendOTPController); // Add resend-otp route
router.post("/verify-otp", validationMiddleware(verifyOTPSchema), verifyOTPController);

export const authRoutes = router;

