import { Router } from "express";
import { registerController, verifyOTPController, loginController, forgotPasswordController, resetPasswordController, verifyForgotPasswordOTPController, resendOTPController } from "./auth.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { registerSchema, verifyOTPSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, verifyForgotPasswordOTPSchema } from "./auth.schema";

const router = Router();

router.post("/register", validationMiddleware(registerSchema), registerController);
router.post("/verify-otp", validationMiddleware(verifyOTPSchema), verifyOTPController);
router.post("/login", validationMiddleware(loginSchema), loginController);
router.post("/forgot-password", validationMiddleware(forgotPasswordSchema), forgotPasswordController);
router.post("/reset-password", validationMiddleware(resetPasswordSchema), resetPasswordController);
router.post("/verify-forgot-password-otp", validationMiddleware(verifyForgotPasswordOTPSchema), verifyForgotPasswordOTPController);
router.post("/resend-otp", resendOTPController);

export const authRoutes = router;

