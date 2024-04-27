const express=require('express');
const router=express.Router();
const kainkaryamController=require('../controllers/fourty_five_kainkaryam_controller');
router.post('/createDate',kainkaryamController.createDatePrice);
router.post('/getDate',kainkaryamController.getDatePrice);
router.post('/deleteDate',kainkaryamController.deleteDatePrice);
router.post('/bookings',kainkaryamController.allBookings);
router.post('/newBooking',kainkaryamController.newBooking);
router.post('/myBookings',kainkaryamController.myBookings)
module.exports=router;