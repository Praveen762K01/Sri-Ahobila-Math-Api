const express=require('express');
const authController=require('../controllers/auth_controller');
const router=express.Router();
router.post('/sendOtp',authController.sendOtp);
router.post('/verifyOtp',authController.verifyOtp);
router.post('/registerUser',authController.registerUser);
router.post('/login',authController.login);
router.post('/myProfile',authController.myProfile);
router.post('/users',authController.usersList);
router.post('/memberApprovalList',authController.memberApprovalList);
router.post('/approveUser',authController.approveUser);
router.post('/activeUsers',authController.activeUsersList);
router.post('/inActiveUsers',authController.inActiveUsersList);
router.post('/activateDeactivateUser',authController.activateDeactivateUser);

module.exports=router;