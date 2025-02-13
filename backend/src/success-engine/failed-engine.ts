import { Response } from 'express';
import { CustomError } from './error';

export const errorResponse = (res: Response, error: CustomError) => {
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
  });
};

