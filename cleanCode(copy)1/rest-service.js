const express = require('express');
const router = express.Router();

const controller = require('./controller');
// console.log(controller);

// router.get('/user',controller);
router.post('/user' , controller.addUserController); 
router.get('/user',controller.getUserController);
router.get('/user/:id',controller.getUserByIdController);
router.delete('/user/:id' , controller.deleteUserController);
router.put('/user',controller.updateUserController);

router.post('/send/:id',controller.sendEmailController);

router.delete('/label',controller.deleteLabelController);
router.put('/la',controller.updateLabelController);
router.post('/label',controller.addLabelController);


module.exports=router






