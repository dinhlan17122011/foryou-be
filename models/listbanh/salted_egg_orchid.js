const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const list = new Schema({
    name:{ type: String },
    number:{ type: Number },
    img:{ type: String },
    describe:{ type: String },
    quantity:{ type: String },
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
});

module.exports= mongoose.model('list',list)