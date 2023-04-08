const express = require('express');
const router = express.Router();
const { fetchNovels } = require('../database/database');

router.get('/novels', (req, res) => {
  fetchNovels((error, results) => {
    if (error) {
      res.status(500).json({ error: '加载失败' });
      return;
    }

    res.status(200).json(results);
  });
});

module.exports = router;
