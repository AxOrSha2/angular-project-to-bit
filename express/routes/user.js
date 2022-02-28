const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//
router.post('/', userController.createUser);
router.get('/', userController.findUsers);
router.get('/:id',userController.findUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
//
module.exports = router;