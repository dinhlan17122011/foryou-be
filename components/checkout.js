import Checkout from '../models/checkout/checkout.js';
import mongoose from 'mongoose';

class CheckoutController {
  async createCheckout(req, res) {
    try {
      const { items, customer } = req.body;
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const newCheckout = new Checkout({ items, customer, totalAmount });
      await newCheckout.save();

      res.status(201).json({ message: 'Tạo checkout thành công', checkout: newCheckout });
    } catch (error) {
      console.error('Lỗi khi tạo checkout:', error);
      res.status(500).json({ message: 'Không thể tạo checkout', error });
    }
  }

  async getCheckoutById(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
      }

      const checkout = await Checkout.findById(id);
      if (!checkout) {
        return res.status(404).json({ message: 'Không tìm thấy checkout' });
      }

      res.status(200).json(checkout);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin checkout:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thông tin checkout', error });
    }
  }

  async updateCheckout(req, res) {
    try {
      const { id } = req.params;
      const { items, customer, status } = req.body;
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
      }

      const updatedCheckout = await Checkout.findByIdAndUpdate(
        id,
        { items, customer, totalAmount, status, updatedAt: Date.now() },
        { new: true }
      );

      if (!updatedCheckout) {
        return res.status(404).json({ message: 'Không tìm thấy checkout để cập nhật' });
      }

      res.status(200).json({ message: 'Cập nhật checkout thành công', checkout: updatedCheckout });
    } catch (error) {
      console.error('Lỗi khi cập nhật checkout:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật checkout', error });
    }
  }

  async deleteCheckout(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
      }

      const deletedCheckout = await Checkout.findByIdAndDelete(id);

      if (!deletedCheckout) {
        return res.status(404).json({ message: 'Không tìm thấy checkout để xóa' });
      }

      res.status(200).json({ message: 'Xóa checkout thành công' });
    } catch (error) {
      console.error('Lỗi khi xóa checkout:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa checkout', error });
    }
  }
}

export default new CheckoutController();