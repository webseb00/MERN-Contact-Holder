const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');


// ROUTE: GET api/auth
// DESC: get user logged in
// ACCESS: private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// ROUTE: POST api/auth
// DESC: auth user and get token
// ACCESS: public

router.post('/', 
  [
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Password is required').exists()
  ], 
  async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if(!user) {
        return res.status(400).json({ msg: 'Invalid credentials!' });
      }

      const isMatch = bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({ msg: 'Invalid password!' });
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      const jwtSecret = process.env.jwtSecretKey || config.get('jwtSecretKey');

      jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
        if(err) throw err;
        res.json({ token });
      });

    } catch(err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;