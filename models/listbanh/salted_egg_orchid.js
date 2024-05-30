const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const mongoServer = new MongoMemoryServer();
const mongoUri = mongoServer.getUri();
const list = new Schema(mongoUri,{
    name:{ type: String },
    number:{ type: Number },
    img:{ type: String },
    describe:{ type: String },
    quantity:{ type: String },
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
});

module.exports= mongoose.model('list',list)