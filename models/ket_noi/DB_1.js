import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Kết nối mặc định
export const connect = () => {
  mongoose.connect('mongodb://localhost:27017/cake', options)
    .then(() => console.log('Connected to default database!'))
    .catch(err => console.error('Error connecting to default database:', err));
};

// Kết nối các database khác
const connectToDatabase = (uri, dbName) => {
  const db = mongoose.createConnection(uri, options);

  db.on('connected', () => {
    console.log(`Connected to ${dbName} database!`);
  });

  db.on('error', (err) => {
    console.error(`Error connecting to ${dbName} database:`, err);
  });

  return db;
};

// Kết nối các database khác tương tự
export const connectSlider = () => connectToDatabase('mongodb://localhost:27017/cake/slider', 'slider');
export const connectAccessory = () => connectToDatabase('mongodb://localhost:27017/cake/accessory', 'accessory');
export const connectDetailCake = () => connectToDatabase('mongodb://localhost:27017/cake/detailcake', 'detailcake');
export const connectIntroduction = () => connectToDatabase('mongodb://localhost:27017/cake/introduction', 'introduction');
export const connectContact = () => connectToDatabase('mongodb://localhost:27017/cake/contact', 'contact');
export const connectPolicy = () => connectToDatabase('mongodb://localhost:27017/cake/policy', 'policy');
export const connectCheckout = () => connectToDatabase('mongodb://localhost:27017/cake/checkout', 'checkout');
