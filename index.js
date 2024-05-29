const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
// import dotenv from 'dotenv';
const db = require('./models/ket_noi/DB_1.js')
// const dbslider =require('./models/ket_noi/DB_2.js');
const postsconnetc = require('./routes/post.js');
app.use(cors());
app.use(postsconnetc)
// dotenv.config()

function dbco(){
db.connect()
db.connectslider()
db.connectsaccessory()
db.connectsdetailcake()
db.connectintroduction()
db.connectcontact()
db.connectpolicy()
}
dbco()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})