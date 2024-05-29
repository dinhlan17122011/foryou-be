const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const introduction = new Schema({
    name:{ type: String },
    describe:{ type: String },
    introductionmainf:[
        {
            img:{type:String},
            describemainf:{type:String}
        }
    ],
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
});

module.exports= mongoose.model('introduction',introduction)