import { MongoMemoryServer } from 'mongodb-memory-server';
import {mongoose} from 'mongoose';
const mongoServer = new MongoMemoryServer();
async function detailcake() {
    const uri = await mongoServer.getUri();
   await mongoose().connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true 
  });

  console.log('Connected to MongoDB In-Memory server');
}
const detailcakeSchema = new mongoose.Schema({
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

const detailcakeModel = mongoose.model('detailcake', detailcakeSchema);
export default detailcakeModel;