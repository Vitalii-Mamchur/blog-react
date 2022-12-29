import express from 'express';
import mongoose from 'mongoose';

import {
  registerValidation,
  loginValidation,
  postCreateValidations,
} from './validations.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose.set('strictQuery', false);

mongoose
  .connect(
    'mongodb+srv://Vitalii:dfghjc243@cluster0.6376m08.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB Ok');
  })
  .catch((err) => {
    console.log('DB error', err);
  });

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
// app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidations, PostController.create);
// app.delete('/posts', checkAuth, PostController.remove);
// app.patch('/posts', checkAuth, PostController.update)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  } else {
    return console.log('Server Ok');
  }
});
