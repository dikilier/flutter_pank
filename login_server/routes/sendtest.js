const express = require('express');
const router = express.Router();
const { sendMail } = require('./email_send');

router.post('/send', async (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = { from: '13151971027@163.com', to, subject, text };
  try {
    await sendMail(mailOptions);
    res.send('邮件发送成功');
  } catch (error) {
    console.log('Error occurred:', error);
    res.status(500).send('邮件发送失败');
  }
});

module.exports = router;
