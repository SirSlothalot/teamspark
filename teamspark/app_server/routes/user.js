var express = require('express');

var router = express.Router();
var ctrlPerson = require('../controllers/person');
var ctrlProfile = require('../controllers/profile');
var ctrlLogout = require('../controllers/logout');
var ctrlProject = require('../controllers/project');

//GET a person
router.get('/', ctrlPerson.personList);

//Add a new person
router.post('/', ctrlPerson.newPerson);

//Delete a person
router.get('/delete/:username', ctrlPerson.deletePerson);

router.get('/:username', ctrlProfile.profile);

router.get('/logout', ctrlLogout.logoutUser);

module.exports = router;
