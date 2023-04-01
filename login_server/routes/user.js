const express = require('express');
const login_router = express.Router();
const { login, register } = require('../database/database');



// 登录路由
login_router.post('/login', async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //调试代码，查看是否接收到请求
  console.log('Received login request with email:', email, 'and password:', password);
  login(email, password, (error, result) => {
    if (error) {
      console.error('发现故障:', error);
      res.status(500).send('服务错误');
    }else if (result) {
      res.status(200).send('登录成功');
    } else {
      res.status(400).send('用户名或密码错误');
    }
  });
});

// 注册路由
login_router.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('Received register request with email:', email, 'and password:', password);

  register(email, password, (error, result) => {
    if (error) {
      console.error('发现故障:', error);
      res.status(500).send('服务错误');
    } else if (result) {
      res.status(200).send('注册成功');
    } else {
      res.status(400).send('注册失败');
    }
  });
});
  
  //导出路由对象
  module.exports = login_router;