import Joi from 'joi';

const email = Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address.',
    'any.required': 'Email is required.'
});

const password = Joi.string()
    .min(8)
    .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .required()
    .messages({
        'string.min': 'Password must be at least 8 characters long.',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        'any.required': 'Password is required.'
    });

export const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name must be at most 30 characters long.',
        'any.required': 'Name is required.'
    }),
    email,
    password
});

export const signInSchema = Joi.object({
    email,
    password
});
