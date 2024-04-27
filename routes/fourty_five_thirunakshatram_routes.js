const express=require('express');
const router=express.Router();
const thirunakshatramController=require('../controllers/fourty_five_thirunakshatram_controller');
router.post('/createDate',thirunakshatramController.createDatePrice);
router.post('/getDate',thirunakshatramController.getDatePrice);
router.post('/deleteDate',thirunakshatramController.deleteDatePrice);
router.post('/bookings',thirunakshatramController.allBookings);
router.post('/newBooking',thirunakshatramController.newBooking);
router.post('/myBookings',thirunakshatramController.myBookings)
module.exports=router;