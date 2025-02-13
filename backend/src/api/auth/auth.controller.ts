import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { successResponse } from '../../success-engine/response';

export class AuthController {
  static async register(req: Request, res: Response) {
    const result = await AuthService.register(req.body);
    successResponse(res, result, 'User registered successfully');
  }

  static async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);
    successResponse(res, result, 'User logged in successfully');
  }
}

