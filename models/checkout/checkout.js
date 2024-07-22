import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  namecake: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  code: { type: String, required: true },
  size: { type: String, required: true },
  notecake: { type: String },
});

const ordererSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const deliveryAddressSchema = new mongoose.Schema({
  // district: { type: String, required: true },
  address: { type: String, required: true },
  ward: { type: String, required: true },
});

const deliveryTimeSchema = new mongoose.Schema({
  time: { type: String, required: true },
  date: { type: String, required: true },
});

const customerSchema = new mongoose.Schema({
  orderer: [ordererSchema],
  deliveryaddress: [deliveryAddressSchema],
  bill: { type: String },
  note: { type: String },
  deliverytime: [deliveryTimeSchema],
});

const AccessorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Đảm bảo thêm price
  size: { type: String, required: true },
  quantity: { type: Number, required: true } // Đảm bảo thêm quantity
});

const checkoutSchema = new mongoose.Schema({
  items: [itemSchema],
  customer: customerSchema,
  totalAmount: { type: Number, required: true },
  Accessory: [AccessorySchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

export default Checkout;
