import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  namecake: String,
  price: Number,
  quantity: Number,
  code: String,
  size:String,
  notecake: String,
});

const customerSchema = new mongoose.Schema({
  orderer:[
  {name:String,
  phone:String,}
  ],
  deliveryaddress:[
    {
      district:String,
      address:String,
      ward:String,
    }
  ],
  bill: String,
  note: String,
  
deliverytime: [
  {
    time:String,
    date:String
  }
]
});

const checkoutSchema = new mongoose.Schema({
  items: [itemSchema],
  customer: customerSchema,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

export default Checkout;
