const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); 
const app = express();
app.use(express.json());
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1111',
    port: 5432, 
});
pool.connect((err, client, done) => {
    if (err) {
        console.error('Помилка підключення до бази даних PostgreSQL:', err);
    } else {
        console.log('Підключено до бази даних PostgreSQL');
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Сервер запущено на порту ${PORT}');
});