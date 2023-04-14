import express from 'express';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET });

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected to the database');
  });

app.post('/order', async (req, res) => {
  const { amount, notes } = req.body;

  const order = await instance.orders.create({
    amount: amount * 100,
    currency: 'INR',
    receipt: 'SATYAM_' + Math.floor(Math.random() * 10000),
    notes: notes,
  });

  res.json({
    success: true,
    message: 'Order created successfully',
    order: order,
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
