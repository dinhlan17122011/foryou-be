import express from 'express';
import cors from 'cors';
const app = express();
const port = 27017;
import postsconnetc from './routes/post.js';
import { connect, connectslider, connectsaccessory, connectsdetailcake, connectintroduction, connectcontact, connectpolicy } from './models/ket_noi/DB_1.js';
app.use(cors());
import Mongod from 'mongod';

const server = new Mongod(27017);
 
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