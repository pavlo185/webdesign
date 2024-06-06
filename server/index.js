const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1111',
    port: 5432,
});

pool.connect((err) => {
    if (err) {
        console.error('Помилка підключення до бази даних PostgreSQL:', err);
    } else {
        console.log('Підключено до бази даних PostgreSQL');
    }
});

app.post('/catalog/postgresql', async (req, res) => {
    try {
        const { name, description, year, price, image } = req.body;

        const query = `
            INSERT INTO catalog (name, description, year, price, image)
            VALUES ($1, $2, $3, $4, $5)
        `;
        await pool.query(query, [name, description, year, price, image]);

        console.log('Модель успішно збережена до PostgreSQL');
        res.status(200).send('Модель успішно збережена до PostgreSQL');
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Server error');
    }
});

app.get('/catalog', async (req, res) => {
    try {
        const query = "SELECT * FROM catalog";
        const result = await pool.query(query);

        const models = result.rows.map(row => ({
            ...row,
            image: row.image  
        }));

        res.status(200).json(models);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Сервер запущено на порту ${PORT}');
});