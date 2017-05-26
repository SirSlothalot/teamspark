var express = require('express');

var router = express.Router();
var ctrlPerson = require('../controllers/person');
var ctrlProfile = require('../controllers/profile');
var ctrlMatch = require('../controllers/match');


//GET a person
router.get('/', ctrlPerson.personList);

//Add a new person
router.post('/', ctrlPerson.newPerson);

router.post('/:username/delete', ctrlProfile.deletePerson);

router.get('/:username', ctrlProfile.renderProfile);

router.get('/:username/edit', ctrlProfile.renderEditProfile);

router.post('/:username/edit', ctrlProfile.submitEditProfile);

router.get('/:username/view', ctrlMatch.renderAllProjects);

router.get('/match/like/:username/:projectTitle', ctrlMatch.likeProject);
router.get('/match/dislike/:username/:projectTitle', ctrlMatch.dislikeProject);

module.exports = router;
