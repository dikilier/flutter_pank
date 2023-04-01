const mysql = require('mysql2');
//数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'user_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  function login(email, password, callback) {
    pool.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password],
      (error, results, fields) => {
        if (error) {
          console.error('Error executing query:', error);
          callback(error, null);
          return;
        }
  
        if (results.length === 0) {
          callback(null, false);
        } else {
          callback(null, true);
        }
      }
    );
}
function register(email, password, callback) {
  pool.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password],
    (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error);
        callback(error, null);
        return;
      }

      if (results.affectedRows === 1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  );
}

module.exports = {
  pool,
  login,
  register
};


