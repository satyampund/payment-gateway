import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected to the database');
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
