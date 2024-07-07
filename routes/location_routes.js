const express=require('express');
const router=express.Router();
const locationController=require('../controllers/location_controller');
router.post('/updateCountries',locationController.updateCountries);
router.post('/updateStates',locationController.updateStates);
router.post('/updateCities',locationController.updateCities);
module.exports=router;
