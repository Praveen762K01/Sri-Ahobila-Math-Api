const express=require('express');
const router=express.Router();
const azagiyasingarController=require('../controllers/azagiyasingar_controller');
router.post('/createAzagiyasingar',azagiyasingarController.createAzagiyasingar);
router.post('/deleteAzagiyasingar',azagiyasingarController.deleteAzagiyasingar);
router.post('/azagiyasingarList',azagiyasingarController.azagiyasingarList);
router.post('/updateAzagiyasingar',azagiyasingarController.updateAzagiyasingar);
module.exports=router;
