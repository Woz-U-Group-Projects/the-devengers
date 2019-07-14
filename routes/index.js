var express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// READ POSTS
router.get('/posts', function(req, res, next){
  models.posts.findAll({}).then(foundPosts => {
    const mappedPosts = foundPosts.map(post => ({
      PostId: post.PostId,
      PostTitle: post.PostTitle,
      Description: post.Description,
      Username: post.Username
    }));
    res.send(JSON.stringify(mappedPosts));
  });
});


// CREATE POST
router.post('/posts', function(req, res, next) {
  models.posts
    .findOrCreate({
      where: {
        PostTitle: req.body.PostTitle
      },
      defaults: {
        
        Username: req.body.Username,
        Description: req.body.Description
      }
    })
    .spread(function(result, created) { 
      if (created) {
        let payload = { subject: result.PostId };
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token});
      } else {
        res.send('This user already exists');
      }
    });
});


module.exports = router;
