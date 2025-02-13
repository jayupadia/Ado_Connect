import { Request, Response, NextFunction } from 'express';
import { CustomError, ValidationError } from '../success-engine/error';
import { logger } from '../config/logger';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  if (err instanceof CustomError) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors,
      });
    }
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};

