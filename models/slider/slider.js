const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const slider = new Schema({
    img:{ type: String },
    nameimg:{ type: String },
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
});

module.exports= mongoose.model('slider',slider)