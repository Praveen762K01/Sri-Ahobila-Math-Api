const express=require('express');
const router=express.Router();
const pradhoshamController=require('../controllers/pradhosham_controller');
router.post('/createDate',pradhoshamController.createDatePrice);
router.post('/getDate',pradhoshamController.getDatePrice);
router.post('/deleteDate',pradhoshamController.deleteDatePrice);
router.post('/bookings',pradhoshamController.allBookings);
router.post('/newBooking',pradhoshamController.newBooking);
router.post('/myBookings',pradhoshamController.myBookings)
module.exports=router;