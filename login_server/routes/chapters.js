const express = require('express');
const router = express.Router();
const { fetchChapters } = require('../database/database');

router.get('/chapters/:novelId', (req, res, next) => {
  const novelId = req.params.novelId;
  fetchChapters(novelId, (error, chapters) => {
    if (error) {
      return next(error);
    }
    res.json(chapters);
  });
});

module.exports = router;
