import mongoose from 'mongoose';
import express from 'express';
// Kết nối mặc định
export const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cake');
    console.log('Connected to default database!');
  } catch (err) {
    console.error('Error connecting to default database:', err);
  }
};

// Kết nối các database khác
const connectToDatabase = (uri, dbName) => {
  const db = mongoose.createConnection(uri);

  db.on('connected', () => {
    console.log(`Connected to ${dbName} database!`);
  });

  db.on('error', (err) => {
    console.error(`Error connecting to ${dbName} database:`, err);
  });

  return db;
};

// Kết nối các database khác tương tự
export const connectSlider = () => connectToDatabase('mongodb://127.0.0.1:27017/cake/slider', 'slider');
export const connectCake = () => connectToDatabase('mongodb://127.0.0.1:27017/cake/cake', 'cake')
export const connectAccessory = () => connectToDatabase('mongodb://127.0.0.1:27017/cake/accessory', 'accessory');
export const connectDetailCake = () => connectToDatabase('mongodb://127.0.0.1:27017/cake/detailcake', 'detailcake');
export const connectIntroduction = () => connectToDatabase('mongodb://127.0.0.1:27017/cake/introduction', 'introduction');
export const connectContact = () => connectToDatabase('mongodb://127.0.0.1:27017/cake/contact', 'contact');
export const connectPolicy = () => connectToDatabase('mongodb://127.0.0.1:27017/cake/policy', 'policy');
export const connectCheckout = () => connectToDatabase('mongodb://127.0.0.1:27017/cake/checkout', 'checkout');

