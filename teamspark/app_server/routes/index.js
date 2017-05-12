var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlMinion = require('../controllers/minion');

/* GET home page. */
router.get('/', ctrlMain.index);

/*GET Minion pages*/
router.get('/minion', ctrlMinion.minion);

module.exports = router;
