var express = require('express');

var router = express.Router();
var ctrlPerson = require('../controllers/person');
var ctrlProfile = require('../controllers/profile');

//GET a person
router.get('/', ctrlPerson.personList);

//Add a new person
router.post('/', ctrlPerson.newPerson);

//Delete a person
router.get('/delete/:username', ctrlPerson.deletePerson);

router.get('/:username', ctrlProfile.renderProfile);

router.get('/:username/edit', ctrlProfile.renderEditProfile);

router.post('/:username/edit', ctrlProfile.submitEditProfile);

module.exports = router;
