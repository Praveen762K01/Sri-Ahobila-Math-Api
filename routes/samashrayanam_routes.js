const express=require('express');
const router=express.Router();
const samashrayanamController=require('../controllers/samashrayanam_controller');
router.post('/createDate',samashrayanamController.createDate);
router.post('/getDate',samashrayanamController.getDate);
router.post('/deleteDate',samashrayanamController.deleteDate);
router.post('/newBooking',samashrayanamController.newBooking);
router.post('/myBookings',samashrayanamController.myBookings);
router.post('/bookings',samashrayanamController.allBookings);
module.exports=router;