const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const login_router = require('./routes/user');
const sendtest_router = require('./routes/sendtest');
const novels_router = require('./routes/novels');
const chapters_router = require('./routes/chapters');
const novelsContents = require('./routes/novels_contents');
const arms = require('./routes/arms');
const arms_get = require('./routes/arms_get');



// 主应用文件
app.use(bodyParser.json());

//使用用户路由
app.use('/', login_router);
//使用小说详情路由
app.use('/', novels_router);
//使用小说目录路由
app.use('/', chapters_router);
//使用小说内容路由
app.use('/', novelsContents);
//使用武器路由
app.use('/', arms);
//插入武器路由
app.use('/', arms_get);


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



