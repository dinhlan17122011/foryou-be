import { MongoMemoryServer } from 'mongodb-memory-server';
import {mongoose} from 'mongoose';
const mongoServer = new MongoMemoryServer();
async function contact() {
    const uri = await mongoServer.getUri();
   await mongoose().connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true 
  });

  console.log('Connected to MongoDB In-Memory server');
}
const contactSchema = new mongoose.Schema({
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

const contactModel = mongoose.model('contact', contactSchema);
export default contactModel;