var express = require('express');
var router = express.Router();
var ctrlPerson = require('../controllers/person');

//GET a person
router.get('/person', ctrlPerson.personList);

//Add a new person
router.post('/person', ctrlPerson.newPerson);

//Delete a person
router.get('/person-delete/:id', ctrlPerson.deletePerson);

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
