const express=require('express');
const router=express.Router();
const dolaiController=require('../controllers/home_dolai_controller');
router.post('/createDate',dolaiController.createDate);
router.post('/getDate',dolaiController.getDate);
router.post('/deleteDate',dolaiController.deleteDate);
router.post('/newBooking',dolaiController.newBooking);
router.post('/myBookings',dolaiController.myBookings);
router.post('/bookings',dolaiController.allBookings);
router.post('/updateBooking',dolaiController.updateStatus);
router.post('/getBookingDetail',dolaiController.getBookingDetail);
router.post('/updatePaymentStatus',dolaiController.updatePaymentStatus);
module.exports=router;
