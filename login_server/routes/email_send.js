// 引入 nodemailer
var nodemailer = require('nodemailer');
// 创建一个SMTP客户端配置
var config = {
    from: '13151971027@163.com',
    to:'1816251531@qq.com',
    text: '你的验证码是: ${verificationCode}',
    subject: 'pank验证码',
  };
// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);

//生成验证码函数
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  

// 发送邮件的函数
function sendMail(mailOptions) {
  return transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error occurred:', error);
    } else {
      console.log('Message sent:', info.messageId);
    }
  });
}

module.exports = {
  sendMail
};