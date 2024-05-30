const express = require('express');
const cors = require('cors');
const app = express();
const port = 27017;
const postsconnetc = require('./routes/post.js');
const db = require('./models/ket_noi/DB_1.js')
app.use(cors());
const Mongod = require('mongod');

const server = new Mongod(27017);
 
app.use(postsconnetc)

function dbco(){
db.connect()
db.connectslider()
db.connectsaccessory()
db.connectsdetailcake()
db.connectintroduction()
db.connectcontact()
db.connectpolicy()
}
server.open((err) => {
  if (!err) {
    dbco()

  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})