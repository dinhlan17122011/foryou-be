import { MongoMemoryServer } from 'mongodb-memory-server';
import {mongoose} from 'mongoose';
const mongoServer = new MongoMemoryServer();
async function contact() {
    const uri = mongoServer.getUri();
   await mongoose().connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true 
  });

  console.log('Connected to MongoDB In-Memory server');
}
// contact()
const checkoutSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      quantity: Number,
      price: Number
    }
  ],
  customer: {
    name: String,
    email: String,
    address: String
  },
  totalAmount: Number,
  createdAt: { type: Date , default:Date.now },
  updatedAt: { type: Date , default:Date.now },
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

export default Checkout;
