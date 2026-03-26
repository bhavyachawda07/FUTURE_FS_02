const { body, validationResult } = require('express-validator');

// Validation for user registration
exports.validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

// Validation for lead creation
exports.validateLead = [
    body('name').notEmpty().withMessage('Name is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('propertyType').isIn(['1BHK', '2BHK', 'Villa', 'Plot']).withMessage('Invalid property type'),
    body('budget').isNumeric().withMessage('Budget must be a number'),
    body('location').notEmpty().withMessage('Location is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];
