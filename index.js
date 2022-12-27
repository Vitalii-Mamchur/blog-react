import express from 'express';
import mongoose from 'mongoose';

import registerValidation from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';

import { register, login, getMe } from './controllers/UserController.js';

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

app.post('/auth/login', login);
app.post('/auth/register', registerValidation, register);
app.get('/auth/me', checkAuth, getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  } else {
    return console.log('Server Ok');
  }
});
