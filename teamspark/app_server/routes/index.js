var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlContact = require('../controllers/contact');
var ctrlReference = require('../controllers/reference');
var ctrlRegister = require('../controllers/register');
var ctrlLogin = require('../controllers/login');

/* GET home page. */
router.get('/', ctrlMain.index);

/*GET Contact pages*/
router.get('/contact', ctrlContact.contact);

/*GET Reference page*/
router.get('/references', ctrlReference.reference);
//
// router.get('/register', ctrlRegister.register);

// router.get('/login', ctrlLogin.login);

//Register user
router.get('/register', ctrlRegister.load);

router.post('/register', ctrlRegister.registerUser);

router.get('/login', function(req,res) {
    res.render('login', {});
});

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}), function(req, res) {
        res.redirect('/');
});

router.get('/logout', function(req,res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
