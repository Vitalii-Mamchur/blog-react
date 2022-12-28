import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Invalid mail format!').isEmail(),
  body('password', 'Password must have at least 5 characters!').isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body('email', 'Invalid mail format!').isEmail(),
  body('password', 'Password must have at least 5 characters!').isLength({
    min: 5,
  }),
  body('fullName', 'Enter Name please!').isLength({
    min: 3,
  }),
  body('avatarUrl', 'Invalid link from avatar!').optional().isURL(),
];

export const postCreateValidations = [
  body('title', 'Enter post title!').isLength({ min: 3 }).isString(),
  body('text', 'enter post text!')
    .isLength({
      min: 10,
    })
    .isString(),
  body('tags', 'Invalid tags format(enter array)').optional().isString(),
  body('imageUrl', 'Invalid link from image!').optional().isString(),
];
