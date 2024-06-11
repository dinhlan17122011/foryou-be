import { MongoMemoryServer } from 'mongodb-memory-server';
import {mongoose} from 'mongoose';
const mongoServer = new MongoMemoryServer();
async function list() {
    const uri = await mongoServer.getUri();
   await mongoose().connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true 
  });

  console.log('Connected to MongoDB In-Memory server');
}
const listSchema = new mongoose.Schema({
    name:{ type: String },
    number:{ type: Number },
    img:{ type: String },
    describe:{ type: String },
    category:{type:String},
    quantity:{ type: String },
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
  });

// const listModel = mongoose.model('list', listSchema);
const listModel = mongoose.model.list || mongoose.model('list', listSchema);
export default listModel;

