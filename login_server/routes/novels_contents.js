const express = require('express');
const router = express.Router();
const { fetchNovelContent } = require('../database/database');

router.get('/novels/contents/:contentId', (req, res) => {
    const contentId = req.params.contentId;
  
    fetchNovelContent(contentId, (error, result) => {
      if (error) {
        res.status(500).json({
          message: error.message,
        });
        return;
      }
  
      res.json(result);
    });
  });

module.exports = router;
