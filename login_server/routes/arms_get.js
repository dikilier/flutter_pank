const express = require('express');
const router = express.Router();
const { insertWeapon } = require('../database/database');

router.post('/insertWeapon', (req, res) => {
  const { arms_name, arms_detail, user_id, arms_image, novel_id } = req.body;

  insertWeapon(arms_name, arms_detail, user_id, arms_image, novel_id, (error, success) => {
    if (error) {
      res.status(500).json({ error: '插入失败' });
      return;
    }

    if (success) {
      res.status(200).json({ message: '插入成功' });
    } else {
      res.status(400).json({ error: '插入失败' });
    }
  });
});

module.exports = router;
