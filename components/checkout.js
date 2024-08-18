import Checkout from '../models/checkout/checkout.js';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
class CheckoutController {
  // Tạo mới checkout
  async createCheckout(req, res) {
    try {
      const { items, customer } = req.body;

      // Kiểm tra xem items có phải là một mảng hợp lệ và không rỗng
      if (!Array.isArray(items) || !items.length) {
        return res.status(400).json({ message: 'Items không hợp lệ hoặc rỗng' });
      }

      // Kiểm tra xem customer có hợp lệ không
      if (!customer || !Array.isArray(customer.orderer) || !Array.isArray(customer.deliveryaddress)) {
        return res.status(400).json({ message: 'Thông tin khách hàng không hợp lệ' });
      }

      const convertedItems = items.map(item => ({
        ...item,
        _id: new mongoose.Types.ObjectId()
      }));

      const convertedCustomer = {
        ...customer,
        _id: new mongoose.Types.ObjectId(),
        orderer: customer.orderer.map(orderer => ({
          ...orderer,
          _id: new mongoose.Types.ObjectId()
        })),
        deliveryaddress: customer.deliveryaddress.map(address => ({
          ...address,
          _id: new mongoose.Types.ObjectId()
        }))
      };

      const totalAmount = convertedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const newCheckout = new Checkout({ items: convertedItems });
      await newCheckout.save();

      res.status(201).json({ message: 'Tạo checkout thành công', checkout: newCheckout });
    } catch (error) {
      console.error('Lỗi khi tạo checkout:', error);
      res.status(500).json({ message: 'Không thể tạo checkout', error });
    }
  }

  // Lấy thông tin checkout theo ID
  async getCheckoutById(req, res) {
    try {
      const id  = req.params.id;
      console.log('Received ID:', id);
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
      }
  
      const checkout = await Checkout.findById(id);
      if (checkout) {
        res.status(200).json(checkout);
        // console.log(checkout);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin checkout:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thông tin checkout', error });
    }
  }
  

  // Cập nhật checkout
async updateCheckout(req, res) {
  try {
    const { id } = req.params;
    const updatedOrderData = req.body;

    // Kiểm tra dữ liệu gửi lên
    const { items, customer } = updatedOrderData;
    if (!updatedOrderData || Object.keys(updatedOrderData).length === 0) {
      return res.status(400).json({ message: 'Invalid data' });
    }
    const areAllObjectIdsValid = items.every(item => mongoose.isValidObjectId(item._id));

if (!areAllObjectIdsValid) {
  return res.status(400).json({ message: 'Invalid ObjectId in items' });
}


    // Kiểm tra xem items có phải là một mảng hợp lệ không
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: 'Items không hợp lệ' });
    }

    // Tính tổng số tiền
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Kiểm tra tính hợp lệ của ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    // Cập nhật checkout
    const updatedCheckout = await Checkout.findByIdAndUpdate(
      id,
      { items, customer, totalAmount, updatedAt: Date.now() },
      { new: true }
    );

    // Kiểm tra xem checkout có tồn tại không
    if (!updatedCheckout) {
      return res.status(404).json({ message: 'Không tìm thấy checkout để cập nhật' });
    }

    // Phản hồi thành công
    res.status(200).json({ message: 'Cập nhật checkout thành công', checkout: updatedCheckout });
  } catch (error) {
    // Ghi lại lỗi chi tiết
    console.error('Lỗi khi cập nhật checkout:', JSON.stringify(error, null, 2));
    res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật checkout', error: error.message || error });
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

  // Thêm phụ kiện vào giỏ hàng
  async addAccessoryToCart(req, res) {
    try {
      const { cartId, name, number, quantity } = req.body;

      console.log('Received from client:', { cartId, name, number, quantity });

      if (!mongoose.isValidObjectId(cartId)) {
        return res.status(400).json({ message: 'Cart ID không hợp lệ' });
      }

      if (!name || typeof name !== 'string' || !number || typeof number !== 'number' || isNaN(number) || !quantity || typeof quantity !== 'number' || isNaN(quantity)) {
        return res.status(400).json({ message: 'Dữ liệu phụ kiện không hợp lệ' });
      }

      const checkout = await Checkout.findById(cartId);

      if (!checkout) {
        return res.status(404).json({ message: 'Checkout không tồn tại' });
      }

      checkout.Accessory.push({
        _id: new mongoose.Types.ObjectId(),
        name,
        number,
        quantity
      });
      // Kiểm tra lại totalAmount để đảm bảo không phải là NaN
      // if (isNaN(checkout.totalAmount)) {
      //   return res.status(400).json({ message: 'Tổng số tiền không hợp lệ' });
      // }

      checkout.updatedAt = new Date();
      await checkout.save();

      res.status(200).json({ message: 'Thêm phụ kiện vào giỏ hàng thành công', checkout });
    } catch (error) {
      console.error('Lỗi khi thêm phụ kiện vào giỏ hàng:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm phụ kiện vào giỏ hàng', error });
    }
  }

  // Sửa thông tin phụ kiện trong giỏ hàng
  async updateAccessoryInCart(req, res) {
    try {
      const { cartId, accessoryId, name, price, quantity } = req.body;

      if (!mongoose.isValidObjectId(cartId)) {
        return res.status(400).json({ message: 'Cart ID không hợp lệ' });
      }

      const checkout = await Checkout.findById(cartId);

      if (!checkout) {
        return res.status(404).json({ message: 'Checkout không tồn tại' });
      }

      const accessoryIndex = checkout.Accessory.findIndex(accessory => accessory._id.toString() === accessoryId);

      if (accessoryIndex === -1) {
        return res.status(404).json({ message: 'Phụ kiện không tồn tại trong giỏ hàng' });
      }

      if (!name || typeof name !== 'string' || !price || typeof price !== 'number' || isNaN(price) || !quantity || typeof quantity !== 'number' || isNaN(quantity)) {
        return res.status(400).json({ message: 'Dữ liệu phụ kiện không hợp lệ' });
      }

      checkout.Accessory[accessoryIndex].name = name;
      checkout.Accessory[accessoryIndex].price = price;
      checkout.Accessory[accessoryIndex].quantity = quantity;

      checkout.totalAmount = checkout.items.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                            checkout.Accessory.reduce((sum, accessory) => sum + accessory.price * accessory.quantity, 0);
      checkout.updatedAt = new Date();
      await checkout.save();

      res.status(200).json({ message: 'Sửa phụ kiện trong giỏ hàng thành công', checkout });
    } catch (error) {
      console.error('Lỗi khi sửa phụ kiện trong giỏ hàng:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi sửa phụ kiện trong giỏ hàng', error });
    }
  }

  // Xóa phụ kiện khỏi giỏ hàng
  async removeAccessoryFromCart(req, res) {
    try {
      const { cartId, accessoryId } = req.body;

      if (!mongoose.isValidObjectId(cartId)) {
        return res.status(400).json({ message: 'Cart ID không hợp lệ' });
      }

      const checkout = await Checkout.findById(cartId);

      if (!checkout) {
        return res.status(404).json({ message: 'Checkout không tồn tại' });
      }

      const accessoryIndex = checkout.Accessory.findIndex(accessory => accessory._id.toString() === accessoryId);

      if (accessoryIndex === -1) {
        return res.status(404).json({ message: 'Phụ kiện không tồn tại trong giỏ hàng' });
      }

      checkout.Accessory.splice(accessoryIndex, 1);

      checkout.totalAmount = checkout.items.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                            checkout.Accessory.reduce((sum, accessory) => sum + accessory.price * accessory.quantity, 0);
      checkout.updatedAt = new Date();
      await checkout.save();

      res.status(200).json({ message: 'Xóa phụ kiện khỏi giỏ hàng thành công', checkout });
    } catch (error) {
      console.error('Lỗi khi xóa phụ kiện khỏi giỏ hàng:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa phụ kiện khỏi giỏ hàng', error });
    }
  }
}


export default new CheckoutController();