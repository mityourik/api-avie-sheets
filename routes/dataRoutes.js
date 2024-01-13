const express = require('express');
const { getData } = require('../controllers/sheetsController');

const router = express.Router();

router.get('/', getData);

module.exports = router;
