import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
import postsconnetc from './routes/post.js';
import { connect, connectSlider, connectAccessory, connectDetailCake, connectIntroduction, connectContact, connectPolicy, connectCheckout, connectCake } from './models/ket_noi/DB_1.js';
app.use(cors());
app.use(express.json());
app.use(postsconnetc);
import home from './components/home.js'

function co () {
  connect();
  connectSlider();
  connectCake()
  connectAccessory();
  connectDetailCake();
  connectIntroduction();
  connectContact();
  connectPolicy();
  connectCheckout();

}
co()

app.get('/', home.index);

// const hort = '192.168.0.124'

app.listen(port, () => {
  console.log(`Example app listening on port http://localho:${port}`)
})