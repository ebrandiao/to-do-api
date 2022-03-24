const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = Router();

// signup route

router.post('/singup', async (req, res) => {
  const { name, password } = req.body
  try {
    const user = await User.findOne( { name } )
    if (user) {
      throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      password:passwordHash
    })
    res.status(201).json({
      name: newUser.name
    })
  } catch (error) {

    if (error.message === 'User already exists') {
      res.status(400).json( { msg: error.message } );
    }
    res.status(500).json( { msg: error.message } )
  }
})

router.post('/login', async (req, res) => {

  const { name, password } = req.body;

  try {
    const user = await User.findOne( { name } );
    if (!user) {
      const error = new Error("User not found");
      error.status = 401
      throw error
    }
    const compareHash = await bcrypt.compare(password, user.password);
    if (!compareHash) {
      throw new Error("Username or pasword invalid")
    }
    const payload = {
      name
    }
    const token = jwt.sign(payload, process.env.SENHA_JWT, { expiresIn: '1day' } )
    res.status(200).json( { payload, token } )

  } catch (error) {

    res.status( error.status || 500 ).json( { msg: error.message } )
  }
})

module.exports = router;
