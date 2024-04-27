const express=require('express');
const router=express.Router();
const Controller=require('../controllers/sixty_thadi_controller');
router.post('/createDate',Controller.createDate);
router.post('/getDate',Controller.getDate);
router.post('/deleteDate',Controller.deleteDate);
router.post('/newBooking',Controller.newBooking);
router.post('/myBookings',Controller.myBookings);
router.post('/bookings',Controller.allBookings);
module.exports=router;