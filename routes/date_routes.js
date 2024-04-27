const express=require('express');
const dateController=require('../controllers/date_controller');
const router=express.Router();
router.post('/create',dateController.createDate);
router.post('/delete',dateController.deleteDate);
router.post('/update',dateController.updateDate);
router.post('/',dateController.getAllDate);
router.post('/getDate',dateController.getDate);
module.exports=router;