const express = require('express')
const router = express.Router()
const passport = require('passport');

const User = require('../../models/user')

// Every route will start with api/users/
// GET api/users (returns ALL users)
router.get('/', function(req, res) {
    User.find()
      .sort({date: -1})
      .then(users => res.json(users))
})

// GET api/users/xxx (returns ONE user by their id)
router.get('/:id', function(req, res) {
    User.findById(req.params.id)
      .then(() => res.json({success: true}))
      .catch(err => res.status(404).json({ success: false}))
})

// POST api/users/login (processes login attempt)
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}))

// POST api/users/signup (creates account)
router.post('/', function(req, res) {

    User.findOne({"local.email": req.body.email}, function(err, user) {

        if(user.local.email === req.body.email) {
            console.log('error email used already');
        } else {
            const newUser = new User();
            newUser.local.email = req.body.email;
            newUser.local.password = req.body.email;
            console.log(req.body);
          User.createUser(newUser, function(err, user) {
              if(err) throw err;
              console.log(user);
          })
        }
    }).then(() => res.json({success: true}))

})