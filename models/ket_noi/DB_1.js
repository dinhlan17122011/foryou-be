const mongoose = require('mongoose');
async function connect(){
    mongoose.connect(`mongodb://127.0.0.1:27017/cake`)
  .then(() => console.log('Connected!'));
  // mongoose.createConnection('mongodb://localhost:27017/slider')
}
async function connectslider(){
  mongoose.createConnection('mongodb://localhost:27017/cake/slider')
  // .then(() => console.log('hh'));
}
async function connectsaccessory(){
mongoose.createConnection('mongodb://localhost:27017/cake/accessory')
}
async function connectsdetailcake(){
  mongoose.createConnection('mongodb://localhost:27017/cake/detailcake')
  }
  async function connectintroduction(){
    mongoose.createConnection('mongodb://localhost:27017/cake/introduction')
    }
async function connectcontact(){
    mongoose.createConnection('mongodb://localhost:27017/cake/contact')
}
async function connectpolicy(){
  mongoose.createConnection('mongodb://localhost:27017/cake/policy')
}
module.exports={connect,connectslider,connectsaccessory,
  connectsdetailcake,connectintroduction,connectcontact,
  connectpolicy};