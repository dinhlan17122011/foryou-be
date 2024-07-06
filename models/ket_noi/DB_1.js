import mongoose from "mongoose";

// import mongoose from 'mongoose';

let defaultConnection;

export const connect = () => {
  defaultConnection = mongoose.createConnection('mongodb://localhost:27017/cake/');
  defaultConnection.on('connected', () => {
    console.log('Connected to default database!');
  });
  defaultConnection.on('error', (err) => {
    console.error('Error connecting to default database:', err);
  });
};

export const connectSlider = () => {
  const sliderConnection = mongoose.createConnection('mongodb://localhost:27017/cake/slider');
  sliderConnection.on('connected', () => {
    // console.log('Connected to slider database!');
  });
  sliderConnection.on('error', (err) => {
    console.error('Error connecting to slider database:', err);
  });
};

export const connectAccessory = () => {
  const accessoryConnection = mongoose.createConnection('mongodb://localhost:27017/cake/accessory');
  accessoryConnection.on('connected', () => {
    // console.log('Connected to accessory database!');
  });
  accessoryConnection.on('error', (err) => {
    console.error('Error connecting to accessory database:', err);
  });
};

export const connectDetailCake = () => {
  const detailCakeConnection = mongoose.createConnection('mongodb://localhost:27017/cake/detailcake');
  detailCakeConnection.on('connected', () => {
    // console.log('Connected to detailcake database!');
  });
  detailCakeConnection.on('error', (err) => {
    console.error('Error connecting to detailcake database:', err);
  });
};

export const connectIntroduction = () => {
  const introductionConnection = mongoose.createConnection('mongodb://localhost:27017/cake/introduction');
  introductionConnection.on('connected', () => {
    // console.log('Connected to introduction database!');
  });
  introductionConnection.on('error', (err) => {
    console.error('Error connecting to introduction database:', err);
  });
};

export const connectContact = () => {
  const contactConnection = mongoose.createConnection('mongodb://localhost:27017/cake/contact');
  contactConnection.on('connected', () => {
    // console.log('Connected to contact database!');
  });
  contactConnection.on('error', (err) => {
    console.error('Error connecting to contact database:', err);
  });
};

export const connectPolicy = () => {
  const policyConnection = mongoose.createConnection('mongodb://localhost:27017/cake/policy');
  policyConnection.on('connected', () => {
    // console.log('Connected to policy database!');
  });
  policyConnection.on('error', (err) => {
    console.error('Error connecting to policy database:', err);
  });
};

export const connectCheckout = () => {
  const checkoutConnection = mongoose.createConnection('mongodb://localhost:27017/cake/checkout');
  checkoutConnection.on('connected', () => {
    console.log('Connected to checkout database!');
  });
  checkoutConnection.on('error', (err) => {
    console.error('Error connecting to checkout database:', err);
  });
};

// export const getDefaultConnection = () => {
//   return defaultConnection;
// };

