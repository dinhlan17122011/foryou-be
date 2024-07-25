import { findById } from '../models/detailcake/detailcake.js';

export const index = async (req, res) => {
  console.log('Received ID:', req.params.id); // Log ID nhận được
  try {
    const product = await findById(req.params.id);
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error in index controller:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
