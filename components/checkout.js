import Checkout from '../models/checkout/checkout.js';

class CheckoutController {
  async createCheckout(req, res) {
    try {
      const { items, customer } = req.body;

      // Tính tổng số tiền
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // Tạo một instance checkout mới
      const newCheckout = new Checkout({ items, customer, totalAmount });

      // Lưu checkout mới vào cơ sở dữ liệu
      await newCheckout.save();

      res.status(201).json({ message: 'Tạo checkout thành công', checkout: newCheckout });
    } catch (error) {
      console.error('Error creating checkout:', error);
      res.status(500).json({ message: 'Không thể tạo checkout', error });
    }
  }

  async getCheckoutById(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
      }

      const checkout = await Checkout.findById(id);

      if (!checkout) {
        return res.status(404).json({ message: 'Không tìm thấy checkout' });
      }

      res.status(200).json(checkout);
    } catch (error) {
      console.error('Error fetching checkout by ID:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thông tin checkout', error });
    }
  }

  async updateCheckout(req, res) {
    try {
      const { id } = req.params;
      const { items, customer } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
      }

      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const updatedCheckout = await Checkout.findByIdAndUpdate(id, { items, customer, totalAmount }, { new: true });

      if (!updatedCheckout) {
        return res.status(404).json({ message: 'Không tìm thấy checkout để cập nhật' });
      }

      res.status(200).json({ message: 'Cập nhật checkout thành công', checkout: updatedCheckout });
    } catch (error) {
      console.error('Error updating checkout:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật checkout', error });
    }
  }

  async deleteCheckout(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
      }

      const deletedCheckout = await Checkout.findByIdAndDelete(id);

      if (!deletedCheckout) {
        return res.status(404).json({ message: 'Không tìm thấy checkout để xóa' });
      }

      res.status(200).json({ message: 'Xóa checkout thành công' });
    } catch (error) {
      console.error('Error deleting checkout:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa checkout', error });
    }
  }
}

export default new CheckoutController();
