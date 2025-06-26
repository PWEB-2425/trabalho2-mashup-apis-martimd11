const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Página de registo
router.get('/register', (req, res) => {
  res.render('register');
});

// Submissão do registo
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.send('Utilizador já existe.');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.redirect('/login');
});

// Página de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Submissão do login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/search',
  failureRedirect: '/login'
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

module.exports = router;