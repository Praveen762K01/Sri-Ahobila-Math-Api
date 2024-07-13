const express=require('express');
const router=express.Router();
const imageController=require('../controllers/image_controller');
const imageUploader=require('../helpers/image_uploader')

router.post('/upload',imageUploader.upload.single('image'),imageController.upload);

module.exports=router;
