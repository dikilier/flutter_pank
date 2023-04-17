const mysql = require('mysql2');
//数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    //user:'user',
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
// 获取小说列表
function fetchNovels(callback) {
  pool.query('SELECT * FROM novels LIMIT 10', (error, results, fields) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

//获取小说章节
function fetchChapters(novelId, callback) {
  pool.query(
    'SELECT * FROM novel_chapters WHERE novel_id = ?',
    [novelId],
    (error, results, fields) => {
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, results);
    }
  );
}

//获取章节下的内容
function fetchNovelContent(contentId, callback) {
  pool.query(
    'SELECT * FROM novel_contents WHERE chapter_id = ?',
    [contentId],
    (error, results, fields) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (results.length === 0) {
        callback(new Error('Content not found'), null);
        return;
      }

      callback(null, results);
    }
  );
}

//获取武器仓库
function fetchArms(callback) {
  pool.query('SELECT * FROM store_house', (error, results, fields) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

//导入武器
function insertWeapon(arms_name, arms_detail, user_id, arms_image, novel_id, callback) {
  pool.query(
    'INSERT INTO store_house (arms_name, arms_detail, user_id, arms_image, novel_id) VALUES (?, ?, ?, ?, ?)',
    [arms_name, arms_detail, user_id, arms_image, novel_id],
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
  register,
  fetchNovels,
  fetchNovelContent,
  fetchChapters,
  fetchArms,
  insertWeapon
};


