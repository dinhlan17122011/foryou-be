import Checkout from '../models/checkout/checkout.js';
import mongoose from 'mongoose';

class CheckoutController {
  // Tạo mới checkout
  async createCheckout(req, res) {
    try {
      const { items, customer } = req.body;
      console.log('items', items);
      console.log('customer', customer);
      // Chuyển đổi các giá trị ObjectId
      const convertedItems = items.map(item => {
        return ({
          ...item,
          _id: new mongoose.Types.ObjectId()
        });
      });

      const convertedCustomer = {
        ...customer,
        // _id: mongoose.Types.ObjectId(customer._id),
        _id: new mongoose.Types.ObjectId(),
        orderer: customer.orderer.map(orderer => ({
          ...orderer,
          // _id: mongoose.Types.ObjectId(orderer._id)
          _id: new mongoose.Types.ObjectId()
        })),
        deliveryaddress: customer.deliveryaddress.map(address => ({
          ...address,
          // _id: mongoose.Types.ObjectId(address._id)
          _id: new mongoose.Types.ObjectId()
        }))
      };

      const totalAmount = convertedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const newCheckout = new Checkout({ items: convertedItems, customer: convertedCustomer, totalAmount });
      await newCheckout.save();

      res.status(201).json({ message: 'Tạo checkout thành công', checkout: newCheckout });
      console.log(hehe);
    } catch (error) {
      console.error('Lỗi khi tạo checkout:', error);
      console.log("Looix");
      res.status(500).json({ message: 'Không thể tạo checkout', error });
    }
  }

  // Lấy thông tin checkout theo ID
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

  // Cập nhật checkout
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

  // Xóa checkout
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

  // Thêm sản phẩm vào giỏ hàng
  async addToCart(req, res) {
    try {
      const { cartId, productId, namecake, price, code, size, quantity } = req.body;

      const checkout = await Checkout.findById(cartId);

      if (!checkout) {
        return res.status(404).json({ message: 'Checkout không tồn tại' });
      }

      const existingItemIndex = checkout.items.findIndex(item => item._id.toString() === productId);

      if (existingItemIndex > -1) {
        checkout.items[existingItemIndex].quantity += quantity;
      } else {
        checkout.items.push({
          _id: mongoose.Types.ObjectId(productId),
          namecake,
          price,
          code,
          size,
          quantity
        });
      }

      checkout.totalAmount += price * quantity;
      checkout.updatedAt = new Date();
      await checkout.save();

      res.status(200).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công', checkout });
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng', error });
    }
  }

  // Sửa thông tin sản phẩm trong giỏ hàng
  async updateCartItem(req, res) {
    try {
      const { cartId, productId, namecake, price, code, size, quantity } = req.body;

      const checkout = await Checkout.findById(cartId);

      if (!checkout) {
        return res.status(404).json({ message: 'Checkout không tồn tại' });
      }

      const itemIndex = checkout.items.findIndex(item => item._id.toString() === productId);

      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
      }

      checkout.items[itemIndex] = {
        _id: mongoose.Types.ObjectId(productId),
        namecake,
        price,
        code,
        size,
        quantity
      };

      checkout.totalAmount = checkout.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      checkout.updatedAt = new Date();
      await checkout.save();

      res.status(200).json({ message: 'Sửa thông tin sản phẩm trong giỏ hàng thành công', checkout });
    } catch (error) {
      console.error('Lỗi khi sửa thông tin sản phẩm trong giỏ hàng:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi sửa thông tin sản phẩm trong giỏ hàng', error });
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  async removeFromCart(req, res) {
    try {
      const { cartId, productId } = req.body;

      const checkout = await Checkout.findById(cartId);

      if (!checkout) {
        return res.status(404).json({ message: 'Checkout không tồn tại' });
      }

      const itemIndex = checkout.items.findIndex(item => item._id.toString() === productId);

      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
      }

      checkout.items.splice(itemIndex, 1);

      checkout.totalAmount = checkout.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      checkout.updatedAt = new Date();
      await checkout.save();

      res.status(200).json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công', checkout });
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng', error });
    }
  }
}

export default new CheckoutController();
