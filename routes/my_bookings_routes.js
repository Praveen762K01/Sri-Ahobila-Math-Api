const express=require('express');
const router=express.Router();
const myBookingsController=require('../controllers/my_bookings_controller');
router.post('/',myBookingsController.myBookings);
module.exports=router;