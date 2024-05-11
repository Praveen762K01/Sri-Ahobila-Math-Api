const express=require('express');
const router=express.Router();
const ponnadiController=require('../controllers/ponnadi_controller');
router.post('/createDate',ponnadiController.createDate);
router.post('/getDate',ponnadiController.getDate);
router.post('/deleteDate',ponnadiController.deleteDate);
router.post('/newBooking',ponnadiController.newBooking);
router.post('/myBookings',ponnadiController.myBookings);
router.post('/bookings',ponnadiController.allBookings);
router.post('/updateBooking',ponnadiController.updateStatus);
router.post('/getBookingDetail',ponnadiController.getBookingDetail);
router.post('/updatePaymentStatus',ponnadiController.updatePaymentStatus);
module.exports=router;
