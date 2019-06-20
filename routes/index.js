var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var authService = require('../services/auth');
var models = require('../models');


//SIGNUP
router.get('/signup', function(req, res, next){
  res.render('signup')
});

router.post('/signup', function(req, res, next) {
  models.users.findOrCreate({
    where: {
      UserName: req.body.username
    },
    defaults : {
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Email: req.body.email,
      Password: authService.hashPassword(req.body.password)
    }
  }).spread(function(result, created){
    if(created){
      res.redirect('/login');
    }else{
      res.send('A user with this username already exists');
    }
  })
});

//LOG IN:
router.get('/login', function(req, res, next) {
  res.render('login');
});


router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePassword(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.redirect('localhost:4200');
      } else {
        console.log('Wrong password');
        res.send('Incorrect username or password');
      }
    }
  });
});

//LOG OUT
router.get('/logout',function(req, res, next){
  res.cookie('jwt','', { expires : new Date (0)});
  res.render('logout')
});


module.exports = router;
