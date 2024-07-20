const express=require('express');
const router=express.Router();
const groupController=require('../controllers/group_controller');

router.post('/create',groupController.createGroup);
router.post('/getActiveGroup',groupController.getActiveGroup);
router.post('/getAll',groupController.getAllGroupName);
router.post('/activateDeactivate',groupController.activateDeactivateGroup);
router.post('/memberGroupMap',groupController.memberGroupMapping);
router.post('/groupMembers',groupController.groupMembers);
router.post('/groupNonMembers',groupController.groupNonMembers);
router.post('/groupMemberRemove',groupController.groupMemberRemove);

module.exports=router;
