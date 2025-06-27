require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const app = express();

// Ligação Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB ligado com sucesso'))
  .catch((err) => {
    console.error('❌ Erro ao ligar MongoDB:', err.message);
    process.exit(1);
  });

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Sessão
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username });
  if (!user) return done(null, false, { message: 'Utilizador não existe' });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return done(null, false, { message: 'Password incorreta' });
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Rotas
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/', authRoutes);
app.use('/', apiRoutes);

app.get('/search', isAuthenticated, (req, res) => {
  res.render('search', {
    user: req.user,
    wiki: null,
    country: null,
    news: []
  });
});

// Middleware de proteção
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// Início servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));