import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validation = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false }); // I have question 

        if (error) {
            return res.status(400).json({
                status: 'error',
                errors: error.details.map(detail => ({
                    path: detail.path,
                    message: detail.message
                }))
            });
        }

        next();
    };
};
