var express = require('express');
var router = express.Router();
const User = require('../schema/User.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', async function(req, res, next) {
  if(req.body.password === req.body.password_rep){
    const userObj = {
      name: req.body.name,
      email: req.body.email,
      name: req.body.password
    };

    const user = new User(userObj);
    try {
      const u = await user.save();
      req.session._id = u._id;
      res.redirect('/users/account');
    } catch (e) {
      next(e);
    }
  }else{
    next('Password ֊ ը չի համընկնում մյուսի հետ');
  }
});

router.get('/logout', function(req, res) {

});

module.exports = router;
