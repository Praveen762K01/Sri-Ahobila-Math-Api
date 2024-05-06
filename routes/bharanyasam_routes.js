const express=require('express');
const router=express.Router();
const bharanyasamController=require('../controllers/bharanyasam_controller');
router.post('/createDate',bharanyasamController.createDate);
router.post('/getDate',bharanyasamController.getDate);
router.post('/deleteDate',bharanyasamController.deleteDate);
router.post('/newBooking',bharanyasamController.newBooking);
router.post('/myBookings',bharanyasamController.myBookings);
router.post('/bookings',bharanyasamController.allBookings);
router.post('/updateBooking',bharanyasamController.updateStatus);
module.exports=router;