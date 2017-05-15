var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlContact = require('../controllers/contact');

/* GET home page. */
router.get('/', ctrlMain.index);

/*GET Minion pages*/
router.get('/contact', ctrlContact.contact);

module.exports = router;
