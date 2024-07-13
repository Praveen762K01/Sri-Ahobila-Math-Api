const express=require('express');
const router=express.Router();
const controller=require('../controllers/thirunakshatram_kainkaryam_controller');
router.post('/thirunakshatramDates',controller.getThirunakshatramDate);
router.post('/thirunakshatramBooking',controller.newThirunakshatramBooking);
router.post('/bookings',controller.getAllThirunakshatramBookings);

module.exports=router;