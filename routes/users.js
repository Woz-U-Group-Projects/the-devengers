var express = require('express');
var router = express.Router();
var models = require('../models'); 
var authService = require('../services/auth');
const jwt = require('jsonwebtoken');

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
router.post("/login", function(req, res, next) {
  models.users
    .findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        console.log("User not found");
        return res.status(401).json("Login Failed");
      } else {
        let passwordMatch = authService.comparePasswords(req.body.password, user.Password
        );
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.cookie("jwt", token);
          res.status(200).json({token});
        } else {
          console.log("Wrong password");
          res.json("Wrong password");
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
          console.log(user);
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

router.get("/logout", function(req, res, next) {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.json("Logged out");
});

router.get("/validateToken", function(req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        res.json(true);
      } else {
        res.json(false);
      }
    });
  } else {
    res.json(false);
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
