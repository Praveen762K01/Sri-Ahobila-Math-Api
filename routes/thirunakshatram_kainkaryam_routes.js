const express=require('express');
const router=express.Router();
const controller=require('../controllers/thirunakshatram_kainkaryam_controller');
router.post('/thirunakshatramDates',controller.getThirunakshatramDate);
router.post('/kainkaryamDates',controller.getKainkaryamDate);
router.post('/thirunakshatramBooking',controller.newThirunakshatramBooking);
router.post('/kainkaryamBooking',controller.newKainkaryamBooking);
module.exports=router;