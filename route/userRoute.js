const express = require('express');
const router = express.Router();
const { handleSignUp, getAllUser, getUser, removeUser,updateUser } = require('../controller/userController');
router.post('/sign-up', handleSignUp);
router.get('/', getAllUser);
router.get('/:id', getUser);
router.put('/:id', updateUser )
router.delete('/:id', removeUser )

module.exports = router;