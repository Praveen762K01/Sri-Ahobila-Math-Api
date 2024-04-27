const express=require('express');
const authController=require('../controllers/auth_controller');
const router=express.Router();
router.post('/sendOtp',authController.sendOtp);
router.post('/verifyOtp',authController.verifyOtp);
router.post('/registerUser',authController.registerUser);
router.post('/login',authController.login);
router.post('/myProfile',authController.myProfile);
module.exports=router;