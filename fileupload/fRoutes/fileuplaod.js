const express = require('express');
const router = express.Router();
const {localfileupload,imageupload} = require('../controller/fileuplaod'); // No destructuring needed

router.post('/localfileupload',localfileupload);
router.post('/imageupload',imageupload);

module.exports = router;

