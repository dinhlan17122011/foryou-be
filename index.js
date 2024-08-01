import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
import postsconnetc from './routes/post.js';
import { connect, connectSlider, connectAccessory, connectDetailCake, connectIntroduction, connectContact, connectPolicy, connectCheckout } from './models/ket_noi/DB_1.js';
app.use(cors());
app.use(express.json());
app.use(postsconnetc);
connect();
connectSlider();
connectAccessory();
connectDetailCake();
connectIntroduction();
connectContact();
connectPolicy();
connectCheckout();


// Hàm xử lý tạo đơn hàng mới;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})