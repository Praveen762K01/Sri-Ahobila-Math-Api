const express=require('express');
const router=express.Router();
const azvarController=require('../controllers/azvar_controller');
router.post('/createAzvar',azvarController.createAzvar);
router.post('/deleteAzvar',azvarController.deleteAzvar);
router.post('/azvarList',azvarController.azvarList);
router.post('/updateAzvar',azvarController.updateAzvar);
module.exports=router;