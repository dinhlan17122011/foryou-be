import { MongoMemoryServer } from 'mongodb-memory-server';
import {mongoose} from 'mongoose';
const mongoServer = new MongoMemoryServer();
async function accessory() {
    const uri = mongoServer.getUri();
   await mongoose().connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true 
  });

  console.log('Connected to MongoDB In-Memory server');
}
const accessorySchema = new mongoose.Schema({
  name:{ type: String },
  number:{ type: Number },
  img:{ type: String },
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
  });

const accessoryModel = mongoose.model('accessories', accessorySchema);
export default accessoryModel;