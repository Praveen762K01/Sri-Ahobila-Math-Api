const express=require('express');
const router=express.Router();
const messageController=require('../controllers/flash_message_controller');

router.post('/create',messageController.createMessage);
router.post('/getActiveMessage',messageController.getActiveMessage);
router.post('/getAllMessage',messageController.getAllMessage);
router.post('/activateDeactivateMessage',messageController.activateDeactivateMessage);

module.exports=router;
