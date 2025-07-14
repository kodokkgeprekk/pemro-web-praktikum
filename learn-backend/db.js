const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',       
  database: 'mhs'  
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Gagal konek:', err);
  } else {
    console.log('Terhubung ke MySQL');
  }
});

module.exports = connection;