const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const login_router = require('./routes/user');
const sendtest_router = require('./routes/sendtest');

// 主应用文件
app.use(bodyParser.json());

//使用用户路由
app.use('/', login_router);
app.use('/sendtest', sendtest_router);


// 设置路由
app.get('/', (req, res) => {
   res.send('调试');
});

// 设置端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});



