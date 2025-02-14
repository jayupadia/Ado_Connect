import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { registerSchema, verifyOTPSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "./auth.schema";

const router = Router();

router.post("/register", validationMiddleware(registerSchema), AuthController.register);
router.post("/verify-otp", validationMiddleware(verifyOTPSchema), AuthController.verifyOTP);
router.post("/login", validationMiddleware(loginSchema), AuthController.login);
router.post("/forgot-password", validationMiddleware(forgotPasswordSchema), AuthController.forgotPassword);
router.post("/reset-password", validationMiddleware(resetPasswordSchema), AuthController.resetPassword);

export const authRoutes = router;

