const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.post('/login',userController.loginUser);
router.get('/', userController.listUsers);
router.get('/search', userController.searchUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/:id/follow', userController.followUser);

module.exports = router;