const express=require('express');
const router=express.Router();
const swathiController=require('../controllers/swathi_controller');
router.post('/createDate',swathiController.createDatePrice);
router.post('/getDate',swathiController.getDatePrice);
router.post('/deleteDate',swathiController.deleteDatePrice);
router.post('/bookings',swathiController.allBookings);
router.post('/newBooking',swathiController.newBooking);
router.post('/myBookings',swathiController.myBookings)
module.exports=router;