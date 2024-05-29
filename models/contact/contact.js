const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const contact = new Schema({
    information:[
        {
            consultinghotline:{type:Number},
            complainthotline:{type:Number},
            email:{type:String}
        }
    ],
    link:[
        {
            facebook:{type:String},
            tiktok:{type:String}
        }
    ],
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
});

module.exports= mongoose.model('contact',contact)