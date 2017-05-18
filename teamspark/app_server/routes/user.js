var express = require('express');

var router = express.Router();
var ctrlPerson = require('../controllers/person');
var ctrlProfile = require('../controllers/profile');
var ctrlLogout = require('../controllers/logout');

//GET a person
router.get('/', ctrlPerson.personList);

//Add a new person
router.post('/', ctrlPerson.newPerson);

//Delete a person
router.get('/delete/:username', ctrlPerson.deletePerson);

router.get('/:username', ctrlProfile.getProfile);

router.get('/:username/edit', ctrlProfile.getEditProfile);

router.post('/:username/edit', ctrlProfile.editProfile);

router.get('/logout', ctrlLogout.logoutUser);

module.exports = router;
