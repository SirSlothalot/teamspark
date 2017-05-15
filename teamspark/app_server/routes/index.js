var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlContact = require('../controllers/contact');
var ctrlReference = require('../controllers/reference');

/* GET home page. */
router.get('/', ctrlMain.index);

/*GET Contact pages*/
router.get('/contact', ctrlContact.contact);

/*GET Reference page*/
router.get('/references', ctrlReference.reference);

module.exports = router;
