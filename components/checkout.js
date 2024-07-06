import Checkout from '../models/checkout/checkout.js';

class CheckoutController {
  async createCheckout(req, res) {
    try {
      const { data } = req.body; // Giả sử cấu trúc dữ liệu của checkout
      
      // Tạo một instance checkout mới
      const newCheckout = new Checkout(data);

      // Lưu checkout mới vào cơ sở dữ liệu
      await newCheckout.save();

      res.status(201).json({ message: 'Tạo checkout thành công', checkout: newCheckout });
    } catch (error) {
      res.status(500).json({ message: 'Không thể tạo checkout', error });
    }
  }

  async getCheckoutById(req, res) {
    try {
      const { id } = req.params;

      // Tìm checkout dựa trên ID
      const checkout = await Checkout.findById(id);

      if (!checkout) {
        return res.status(404).json({ message: 'Không tìm thấy checkout' });
      }

      res.status(200).json(checkout);
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thông tin checkout', error });
    }
  }

  async updateCheckout(req, res) {
    try {
      const { id } = req.params;
      const { data } = req.body; // Giả sử cấu trúc dữ liệu cập nhật của checkout

      // Cập nhật checkout dựa trên ID
      const updatedCheckout = await Checkout.findByIdAndUpdate(id, data, { new: true });

      if (!updatedCheckout) {
        return res.status(404).json({ message: 'Không tìm thấy checkout để cập nhật' });
      }

      res.status(200).json({ message: 'Cập nhật checkout thành công', checkout: updatedCheckout });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật checkout', error });
    }
  }

  async deleteCheckout(req, res) {
    try {
      const { id } = req.params;

      // Xóa checkout dựa trên ID
      const deletedCheckout = await Checkout.findByIdAndDelete(id);

      if (!deletedCheckout) {
        return res.status(404).json({ message: 'Không tìm thấy checkout để xóa' });
      }

      res.status(200).json({ message: 'Xóa checkout thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa checkout', error });
    }
  }
}

export default new CheckoutController();

