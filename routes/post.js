import { Router } from 'express';
const router = Router();
import cake from '../components/list.js';
import slider from '../components/slider.js';
import detailcake from '../components/detailcake.js';
import accessory from '../components/accessory.js';
import introduction from '../components/introduction.js';
import contact from '../components/contact.js';
import policy from '../components/policy.js';
import checkoutController from '../components/checkout.js';

router.use('/cake', cake.index);

router.use('/slider', slider.index);

router.use('/products/664c8e6ebc300b229fcd3fb0', detailcake.index);
router.use('/products/66486db58cc1a442de62368d', detailcake.index1);
router.use('/products/664870c98cc1a442de623694', detailcake.index2);
router.use('/products/664871e48cc1a442de623698', detailcake.index3);
router.use('/products/664873ec8cc1a442de62369a', detailcake.index4);
router.use('/products/664874a78cc1a442de62369c', detailcake.index5);
router.use('/products/664874a78cc1a442de62369c', detailcake.index6);
router.use('/products/664875a78cc1a442de62369d', detailcake.index7);
router.use('/products/664875f48cc1a442de6236a0', detailcake.index8);

router.use('/accessory',accessory.index)

router.use('/introduction',introduction.index)

router.use('/contact',contact.index)

router.use('/policy',policy.index)

//Checkout 

// // Hàm xử lý tạo đơn hàng mới
// const createOrder = async (req, res) => {
//     try {
//       const { items, customer } = req.body;
  
//       // Tính tổng số tiền
//       const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
//       // Tạo đơn hàng mới
//       const newOrder = new Order({
//         items,
//         customer,
//         totalAmount,
//       });
  
//       // Lưu đơn hàng vào cơ sở dữ liệu
//       await newOrder.save();
  
//       res.status(200).json({ message: 'Đơn hàng đã được tạo thành công', order: newOrder });
//     } catch (error) {
//       res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo đơn hàng', error });
//     }
//   };
  
//   // Hàm xử lý sửa đơn hàng
//   const updateOrder = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { items, customer, status } = req.body;
  
//       // Tính tổng số tiền
//       const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
//       // Cập nhật đơn hàng
//       const updatedOrder = await Order.findByIdAndUpdate(
//         id,
//         {
//           items,
//           customer,
//           totalAmount,
//           status,
//           updatedAt: Date.now(),
//         },
//         { new: true }
//       );
  
//       if (!updatedOrder) {
//         return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
//       }
  
//       res.status(200).json({ message: 'Đơn hàng đã được cập nhật thành công', order: updatedOrder });
//     } catch (error) {
//       res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật đơn hàng', error });
//     }
//   };
  
//   // Hàm xử lý xóa đơn hàng
//   const deleteOrder = async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       const deletedOrder = await Order.findByIdAndDelete(id);
  
//       if (!deletedOrder) {
//         return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
//       }
  
//       res.status(200).json({ message: 'Đơn hàng đã được xóa thành công' });
//     } catch (error) {
//       res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa đơn hàng', error });
//     }
//   };
  

//   router.use('/checkout',checkout.createOrder)
//   router.use('/checkout/:id',checkout.deleteOrder)
//   router.use('/checkout/:id',checkout.updateOrder)

// POST /api/checkout - Tạo một checkout mới
router.post('/checkout', checkoutController.createCheckout);

// GET /api/checkout/:id - Lấy thông tin của checkout dựa trên ID
router.get('/checkout/:id', checkoutController.getCheckoutById);

// PUT /api/checkout/:id - Cập nhật thông tin của checkout dựa trên ID
router.put('/checkout/:id', checkoutController.updateCheckout);

// DELETE /api/checkout/:id - Xóa checkout dựa trên ID
router.delete('/checkout/:id', checkoutController.deleteCheckout);

export default router;