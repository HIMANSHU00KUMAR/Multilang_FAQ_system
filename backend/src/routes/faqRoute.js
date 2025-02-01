const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

router.post('/', faqController.createFAQ);
router.get('/', faqController.getFAQs);

module.exports = router;