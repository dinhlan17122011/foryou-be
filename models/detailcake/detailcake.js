const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const detailcake = new Schema({
    name:{type: String},
    moneybysize:[
       { 
        money:{ type: Number },
        size:{ type: String },
        }
    ],
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
});

module.exports= mongoose.model('detailcake',detailcake)