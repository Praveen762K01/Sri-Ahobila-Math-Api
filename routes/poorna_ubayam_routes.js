const express=require('express');
const router=express.Router();
const poornaUbayamController=require('../controllers/poorna_ubayam_controller');
router.post('/createDate',poornaUbayamController.createPrice);
router.post('/getPrice',poornaUbayamController.getPrice);
router.post('/getAllPrice',poornaUbayamController.getAllPrice);
router.post('/deletePrice',poornaUbayamController.deletePrice);
router.post('/newBooking',poornaUbayamController.newBooking);
router.post('/myBookings',poornaUbayamController.myBookings);
router.post('/bookings',poornaUbayamController.bookings);
router.post('/updateBooking',poornaUbayamController.updateStatus);
router.post('/getBookingDetail',poornaUbayamController.getBookingDetail);
router.post('/updatePaymentStatus',poornaUbayamController.updatePaymentStatus);
module.exports=router;
