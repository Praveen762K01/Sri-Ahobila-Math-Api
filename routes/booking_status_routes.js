const express=require('express');
const router=express.Router();
const statusController=require('../controllers/booking_status_controller');
router.post('/allBookingStatus',statusController.allBookingsStatus);
module.exports=router;