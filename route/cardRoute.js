const express = require('express');
const router = express.Router();
const { addCard, allCard  } = require('../controller/cardController');
router.post('/new', addCard);
router.get('/', allCard);

module.exports = router;