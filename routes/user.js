const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

// ROUTE: POST api/users
// DESC: register a user
// ACCESS: public

router.post('/', [
    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ], async (req, res) => {

    // check for errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // firstly check if user exists
      if(user) return res.status(500).json({ msg: 'User already exists' });
      // if not exists, create new user 
      user = new User({ name, email, password });

      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);
      user.password = hashedPassword;
      // save user instance in database
      await user.save();
      // assign token to newly created user

      const jwtToken = process.env.jwtSecretKey || config.get('jwtSecretKey');

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, jwtToken, { expiresIn: 3600 }, (err, token) => {
        if(err) throw err;
        res.json({ token });
      });

    } catch(err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;