import mongoose, { set } from 'mongoose';

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

const ordererSchemarecipient = new mongoose.Schema({
  recipientName: { type: String },
  recipientPhone: { type: String },
});

const deliveryAddressSchema = new mongoose.Schema({
  address: { type: String },
  district: { type: String },
  ward: { type: String },
});

const deliveryTimeSchema = new mongoose.Schema({
  time: { type: String },
  date: { type: String },
});

function stringToBoolean(str) {
  return str === 'true'; // Chỉ chuyển 'true' thành true, các giá trị khác thành false
}

const customerSchema = new mongoose.Schema({
  orderer: [ordererSchema],
  deliveryaddress: [deliveryAddressSchema],
  ordererSchemarecipient:[ordererSchemarecipient],
  bill: { type:String },
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
  // totalAmount: { type: Number },
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

const Checkout = mongoose.model('checkout', checkoutSchema);

export default Checkout;
