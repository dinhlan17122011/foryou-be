import { MongoMemoryServer } from 'mongodb-memory-server';
import {mongoose} from 'mongoose';
const mongoServer = new MongoMemoryServer();
async function accessory() {
    const uri = await mongoServer.getUri();
   await mongoose().connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true 
  });

  console.log('Connected to MongoDB In-Memory server');
}
const accessorySchema = new mongoose.Schema({
    img:{ type: String },
    nameimg:{ type: String },
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
  });

const accessoryModel = mongoose.model('accessory', accessorySchema);
export default accessoryModel;