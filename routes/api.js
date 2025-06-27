const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');

// Middleware para verificar se o utilizador está autenticado
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/api/search', isAuthenticated, async (req, res) => {
  const term = req.query.q;
  if (!term) return res.redirect('/search');

  try {
    const wikiRes = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${term}`);
    const countryRes = await axios.get(`https://restcountries.com/v3.1/name/${term}`);
    const country = countryRes.data[0];

    // Chamada à GNews API
    const newsRes = await axios.get(`https://gnews.io/api/v4/search`, {
      params: {
        q: country.name.common,
        token: process.env.GNEWS_KEY,
        lang: 'pt',
        max: 3
      }
    });

    const wiki = wikiRes.data;
    const news = newsRes.data.articles;

    // Guardar histórico
    req.user.searches.push(term);
    await req.user.save();

    res.render('search', {
      user: req.user,
      wiki,
      country,
      news
    });

  } catch (err) {
    console.error(err);
    res.send("Erro ao buscar dados. Tente outro país.");
  }
});
module.exports = router;