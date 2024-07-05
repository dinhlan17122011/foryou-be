import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
import postsconnetc from './routes/post.js';

import { connect, connectslider, connectsaccessory, connectsdetailcake, connectintroduction, connectcontact, connectpolicy, connectcheckout } from './models/ket_noi/DB_1.js';
app.use(cors());
 
app.use(postsconnetc)

function dbco(){
  connect()
  connectslider()
  connectsaccessory()
  connectsdetailcake()
  connectintroduction()
  connectcontact()
  connectpolicy()
  connectcheckout()
}
    dbco()
const db1111=async (req, res) => {
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
}
db1111()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})