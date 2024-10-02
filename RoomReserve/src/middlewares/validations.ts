// import { Request, Response, NextFunction } from 'express';
// import { validationResult } from 'express-validator';

// // Validation middleware to handle validation errors
// export const validate = (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             status: 'error',
//             errors: errors.array().map(err => ({
//                 path: err.param,   // Use `err.param` to get the field name with the error
//                 message: err.msg   // The error message
//             }))
//         });
//     }

//     next();
// };
