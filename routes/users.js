var express = require('express');
var router = express.Router();
var models = require('../models'); 
var authService = require('../services/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.users.findAll({}).then(foundUsers => {
    const mappedUsers = foundUsers.map(user => ({
      UserID: user.UserId,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Username: user.Username,
    }));
    res.send(JSON.stringify(mappedUsers));
  });
});

//SIGNUP
router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstname,
        LastName: req.body.lastname,
        Email: req.body.email,
        Username: req.body.username,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function(result, created) { 
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

// LOGIN
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
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.send('Login successful');
      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});

//PROFILE
router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.send(JSON.stringify(user));
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

//LOGOUT
router.get('/logout', function (req, res) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});


module.exports = router;
