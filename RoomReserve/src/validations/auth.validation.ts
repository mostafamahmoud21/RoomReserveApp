import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Combined SignUp Validator and Error Handler
export const signUpValidator = [
    // Name validation
    check('name')
        .trim()
        .isLength({ min: 3, max: 30 }).withMessage('Name must be between 3 and 30 characters long.')
        .notEmpty().withMessage('Name is required.'),

    // Email validation
    check('email')
        .isEmail().withMessage('Please enter a valid email address.')
        .notEmpty().withMessage('Email is required.'),

    // Password validation
    check('password')
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

// Combined SignIn Validator and Error Handler
export const signInValidator = [
    // Email validation
    check('email')
        .isEmail().withMessage('Please enter a valid email address.')
        .notEmpty().withMessage('Email is required.'),

    // Password validation
    check('password')
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
