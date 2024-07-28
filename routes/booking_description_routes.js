const express=require('express');
const router=express.Router();
const descriptionController=require('../controllers/booking_description_controller');

router.post('/createDescription',descriptionController.createDescription);
router.post('/getBookingDescription',descriptionController.getBookingDescription);
router.post('/getAllDescription',descriptionController.getAllDescription);

module.exports=router;
