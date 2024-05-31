import { MongoMemoryServer } from 'mongodb-memory-server';
import {mongoose} from 'mongoose';
const mongoServer = new MongoMemoryServer();
async function introduction() {
    const uri = await mongoServer.getUri();
   await mongoose().connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true 
  });

  console.log('Connected to MongoDB In-Memory server');
}
const introductionSchema = new mongoose.Schema({
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

const introductionModel = mongoose.model('introduction', introductionSchema);
export default introductionModel;