const express=require('express');
const router=express.Router();
const goodaraivalliController=require('../controllers/goodaraivalli_controller');
router.post('/createDate',goodaraivalliController.createDate);
router.post('/getDate',goodaraivalliController.getDate);
router.post('/deleteDate',goodaraivalliController.deleteDate);
router.post('/newBooking',goodaraivalliController.newBooking);
router.post('/myBookings',goodaraivalliController.myBookings);
router.post('/bookings',goodaraivalliController.allBookings);
module.exports=router;