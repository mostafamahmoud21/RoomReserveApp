import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
export const changePasswordValidator = [
    // Password validation
    check('oldPassword')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
        .notEmpty().withMessage('Password is required.'),
        check('newPassword')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
        .notEmpty().withMessage('Password is required.'),

    // Error handling middleware
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next();
    }
];
