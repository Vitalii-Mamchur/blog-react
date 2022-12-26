import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

mongoose
  .connect(
    'mongodb+srv://Vitalii:dfghjc243@cluster0.6376m08.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB Ok');
  })
  .catch((err) => {
    console.log('DB error', err);
  });

const app = express();

app.use(express.json());

app.post('/auth/register', (req, res) => {});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  } else {
    return console.log('Server Ok');
  }
});
