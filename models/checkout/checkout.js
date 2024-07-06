import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json()); // Sử dụng body-parser để xử lý JSON

// Thiết lập MongoDB In-Memory server
const mongoServer = await MongoMemoryServer.create();
const mongoUri = mongoServer.getUri();

mongoose.connect(mongoUri);

mongoose.connection.once('open', () => {
  console.log('Đã kết nối tới MongoDB In-Memory server');
});

// Định nghĩa Schema cho Đơn Hàng
const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const contactModel = mongoose.model('order', orderSchema);
export default contactModel;
