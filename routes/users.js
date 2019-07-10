var express = require('express');
var router = express.Router();
var models = require('../models'); 
var authService = require('../services/auth');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', verifyToken, function(req, res, next) {
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

function verifyToken(req, res, next) { //verify if authorization key is present part of the headers
  if (!req.headers.authorization) { // if no present
    return res.status(401).send('Unauthorized request')
  } 
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject;
  next();
}

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
        Level: req.body.level,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function(result, created) { 
      if (created) {
        let payload = { subject: result.UserId };
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token});
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
        let payload = { subject: user.UserId};
        let token = jwt.sign(payload, 'secretKey');
        console.log(token);
        res.status(200).send({token});
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

router.get('/posts', (req, res) => {
  let posts = [
    {
      "_id": "1",
      "title": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "title": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "title": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "title": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "title": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "title": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ];
  res.json(posts);
});


module.exports = router;
