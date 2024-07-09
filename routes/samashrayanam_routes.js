const express=require('express');
const router=express.Router();
const samashrayanamController=require('../controllers/samashrayanam_controller');
router.post('/createDate',samashrayanamController.createDate);
router.post('/getDate',samashrayanamController.getDate);
router.post('/getAllPrice',samashrayanamController.getAllPrice),
router.post('/deleteDate',samashrayanamController.deleteDate);
router.post('/newBooking',samashrayanamController.newBooking);
router.post('/myBookings',samashrayanamController.myBookings);
router.post('/bookings',samashrayanamController.allBookings);
router.post('/updateBooking',samashrayanamController.updateStatus);
router.post('/getBookingDetail',samashrayanamController.getBookingDetail);
module.exports=router;