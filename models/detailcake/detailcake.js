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
  export const findById = async (id) => {
    try {
      // Kiểm tra xem id có phải là một ObjectId hợp lệ không
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID format');
      }
      return await Product.findById(id).exec(); // Sử dụng exec() để trả về một Promise
    } catch (error) {
      throw new Error('Error finding product: ' + error.message);
    }
  };
const detailcakeModel = mongoose.model('detailcake', detailcakeSchema);
export default detailcakeModel;