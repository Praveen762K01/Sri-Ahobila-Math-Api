const express=require('express');
const projectController=require('../controllers/project_controller');
const router=express.Router();
router.post('/getProject',projectController.getProject);
router.post('/createProject',projectController.createProject);
router.post('/updateProject',projectController.updateProject);
module.exports=router;