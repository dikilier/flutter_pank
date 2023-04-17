const express = require('express');
const router = express.Router();
const { fetchArms } = require('../database/database');

router.get('/arms', (req, res) => {
    fetchArms((error, results) => {
      if (error) {
        res.status(500).json({ error: '加载失败' });
        return;
      }
  
      res.status(200).json(results);
    });
  });

  module.exports = router;