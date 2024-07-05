import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
// import { json } from 'body-parser';
import mongoose from 'mongoose';
const app = express();

// Thiết lập MongoDB In-Memory server
const mongoServer = new MongoMemoryServer();
mongoServer.getUri().then((mongoUri) => {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once('open', () => {
    console.log('Đã kết nối tới MongoDB In-Memory server');
  });
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

// const Order = mongoose.model('Order', orderSchema);
// API xóa đơn hàng
app.delete('/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedOrder = await Order.findByIdAndDelete(id);
  
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
      }
  
      res.status(200).json({ message: 'Đơn hàng đã được xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa đơn hàng', error });
    }
  });
  // API thêm đơn hàng
app.post('/orders', async (req, res) => {
    try {
      const { items, customer } = req.body;
  
      // Tính tổng số tiền
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      // Tạo đơn hàng mới
      const newOrder = new Order({
        items,
        customer,
        totalAmount,
      });
  
      // Lưu đơn hàng vào cơ sở dữ liệu
      await newOrder.save();
  
      res.status(201).json({ message: 'Đơn hàng đã được tạo thành công', order: newOrder });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo đơn hàng', error });
    }
  });
// API sửa đơn hàng
app.put('/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { items, customer, status } = req.body;
  
      // Tính tổng số tiền
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      // Cập nhật đơn hàng
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          items,
          customer,
          totalAmount,
          status,
          updatedAt: Date.now(),
        },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
      }
  
      res.status(200).json({ message: 'Đơn hàng đã được cập nhật thành công', order: updatedOrder });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật đơn hàng', error });
    }
  });
    
  

  
const contactModel = mongoose.model('checkout', orderSchema);
export default contactModel;