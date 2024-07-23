import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  namecake: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  code: { type: String },
  size: { type: String },
  notecake: { type: String },
});

const ordererSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
});

const deliveryAddressSchema = new mongoose.Schema({
  // district: { type: String },
  address: { type: String },
  ward: { type: String },
});

const deliveryTimeSchema = new mongoose.Schema({
  time: { type: String },
  date: { type: String },
});

const customerSchema = new mongoose.Schema({
  orderer: [ordererSchema],
  deliveryaddress: [deliveryAddressSchema],
  bill: { type: String },
  note: { type: String },
  deliverytime: [deliveryTimeSchema],
});

const AccessorySchema = new mongoose.Schema({
  name: { type: String },
  number: { type: Number }, // Đảm bảo thêm price
  quantity: { type: Number } // Đảm bảo thêm quantity
});

const checkoutSchema = new mongoose.Schema({
  items: [itemSchema],
  customer: customerSchema,
  totalAmount: { type: Number },
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
