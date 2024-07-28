const express=require('express');
const router=express.Router();
const imageController=require('../controllers/image_controller');
const imageUploader=require('../helpers/image_uploader')

router.post('/userImageUpload',imageUploader.userImageUpload.single('image'),imageController.upload);
router.post('/azvarImageUpload',imageUploader.azvarUpload.single('image'),imageController.upload);
router.post('/azagiyasingarImageUpload',imageUploader.azagiyasingarUpload.single('image'),imageController.upload);
router.post('/goodaraivalliImageUpload',imageUploader.goodaraivalliImageUpload.single('image'),imageController.upload);

module.exports=router;
