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

router.post('/checkout', checkoutController.createCheckout);
router.get('/checkout/:id', checkoutController.getCheckoutById);
router.put('/checkout/:id', checkoutController.updateCheckout);
router.delete('/checkout/:id', checkoutController.deleteCheckout);
router.post('/checkout/:id', checkoutController.addAccessoryToCart); // Thêm sản phẩm vào giỏ hàng
// console.log(checkoutController.createCheckout);

export default router;