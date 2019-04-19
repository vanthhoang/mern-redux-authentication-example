const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

  // Simple validation
  if(!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }


   // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        name,
        email,
        password
      });

       // Create salt & hash (generate a salt to create a hash (a password hash from a plaintext password))
      bcrypt.genSalt(10, (err, salt) => {       // 10 is the # of rounds we want to use, the higher the more secure (default is 10)
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;   // saving plaintext to hash
          newUser.save()            // saving to the database 
            .then(user => {
              jwt.sign(
                { id: user.id },         // this is the payload
                config.get('jwtSecret'),
                { expiresIn: 3600 },      // only last for an hour
                (err, token) => {          // callback (asynchronous)
                  if(err) throw err;
                   res.json({               // this is where we want to send the response
                    token: token,           // give us a token to authenticate with private routes 
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  });
                }
              )
            });
        })
      })
    })
});

module.exports = router;