const express = require('express');
const router = express.Router();
const { addList } = require('../controller/listController');
router.post('/new', addList);
module.exports = router;