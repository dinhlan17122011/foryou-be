import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
import postsconnetc from './routes/post.js';

import { connect, connectSlider, connectAccessory, connectDetailCake, connectIntroduction, connectContact, connectPolicy, connectCheckout } from './models/ket_noi/DB_1.js';
import bodyParser from 'body-parser';
// import { connect, connectslider, connectsaccessory, connectsdetailcake, connectintroduction, connectcontact, connectpolicy, connectcheckout } from './models/ket_noi/DB_1.js';
app.use(cors());
app.use(bodyParser.json());
app.use(postsconnetc);


// Kết nối đến các cơ sở dữ liệu
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