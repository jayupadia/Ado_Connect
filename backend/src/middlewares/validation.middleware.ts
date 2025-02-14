import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../success-engine/error';

export const validationMiddleware = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                statusCode: 400,
                errors: error.errors.map(err => ({ field: err.path.join('.'), message: err.message })),
            });
        } else {
            next(error);
        }
    }
};

