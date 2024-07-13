const express=require('express');
const router=express.Router();
const controller=require('../controllers/thirunakshatram_kainkaryam_controller');
router.post('/kainkaryamDates',controller.getKainkaryamDate);
router.post('/kainkaryamBooking',controller.newKainkaryamBooking);
router.post('/bookings',controller.getAllKainkaryamBookings);
module.exports=router;