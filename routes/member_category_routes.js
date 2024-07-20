const express=require('express');
const router=express.Router();
const categoryController=require('../controllers/member_category_controller');

router.post('/create',categoryController.createCategory);
// router.post('/getActiveMessage',messageController.getActiveMessage);
router.post('/getAll',categoryController.getAllCategoryName);
router.post('/activateDeactivate',categoryController.activateDeactivateCategory);
router.post('/categoryNonMembers',categoryController.categoryNonMembers);
router.post('/memberCategoryMap', categoryController.memberCategoryMapping);
router.post('/categoryMembers',categoryController.categoryMembers);
router.post('/removeCategory',categoryController.removeCategoryFromUsers);

module.exports=router;
