import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
import postsconnetc from './routes/post.js';

import { connect, connectslider, connectsaccessory, connectsdetailcake, connectintroduction, connectcontact, connectpolicy } from './models/ket_noi/DB_1.js';
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
}
    dbco()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})