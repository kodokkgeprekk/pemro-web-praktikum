const express = require('express');
const mysql = require('mysql2/promise');
const data = require('./example-data.json');

(async () => {
  const app = express();

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'my_db',
    });

    console.log('✅ Connected to MySQL with ID:', connection.threadId);
    return connection;
  } catch (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
    process.exit(1); // keluar jika koneksi gagal
  }


  app.use(express.json());

  app.get('/api/users', async (req, res) => {
    try {
      const [results, fields] = await connection.query('SELECT * FROM `users`');

      res.json({
        data: {
          results,
        },
        message: 'Users retrieved successfully',
      });
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = data.find((u) => u.id == id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });

  app.post('/users', (req, res) => {
    const user = req.body;
    data.push(user);
    res.status(201).send({ message: 'User created' });
  });

  app.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = data.find((u) => u.id == id);
    if (user) {
      Object.assign(user, req.body);
      res.send({ message: 'User updated' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const index = data.findIndex((u) => u.id == id);
    if (index !== -1) {
      data.splice(index, 1);
      res.send({ message: 'User deleted' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });

  app.listen(3000, () => console.log('Listening on port 3000'));
})();