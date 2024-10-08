const express = require('express');
const router = express.Router();
const Controller = require('../controllers/chatru_nithya_thadi_controller');
router.post('/createDate', Controller.createDate);
router.post('/getDate', Controller.getDate);
router.post('/getAllPrice', Controller.getAllDate);
router.post('/deleteDate', Controller.deleteDate);
router.post('/newBooking', Controller.newBooking);
router.post('/myBookings', Controller.myBookings);
router.post('/bookings', Controller.allBookings);
router.post('/updateBooking', Controller.updateStatus);
router.post('/getBookingDetail', Controller.getBookingDetail);
router.post('/updatePaymentStatus', Controller.updatePaymentStatus);
module.exports = router;
