var express = require('express');



var router = express.Router();
var ctrlPerson = require('../controllers/person');

//GET a person
router.get('/', ctrlPerson.personList);

//Add a new person
router.post('/', ctrlPerson.newPerson);

//Delete a person
router.get('/delete/:id', ctrlPerson.deletePerson);



router.get('/logout', function(req,res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;