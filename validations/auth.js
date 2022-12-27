import { body } from 'express-validator';

const registerValidation = [
  body('email', 'Invalid mail format!').isEmail(),
  body('password', 'Password must have at least 5 characters!').isLength({
    min: 5,
  }),
  body('fullName', 'Enter Name please!').isLength({
    min: 3,
  }),
  body('avatarUrl', 'Invalid link from avatar!').optional().isURL(),
];

export default registerValidation;
