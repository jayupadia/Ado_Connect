import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { registerSchema, loginSchema } from './auth.schema';

const router = Router();

router.post('/register', validationMiddleware(registerSchema), AuthController.register);
router.post('/login', validationMiddleware(loginSchema), AuthController.login);

export const authRoutes = router;

