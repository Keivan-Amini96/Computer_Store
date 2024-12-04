const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'database-1.ciwlsxmyu0ev.us-east-1.rds.amazonaws.com',
    user: 'test',
    password: 'testtest',
    database: 'test'
});

db.connect((err) => {
    if (err) {
        console.error('Error :', err.stack);
        return;
    }
    console.log('Server Started');
});
app.post('/login', (req, res) => {
    const { username, password, is_admin} = req.body;
    db.execute('SELECT pd FROM users WHERE un = ? and is_admin = ?', [username, is_admin], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        if(password === user.pd) {
            const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });
            const jsonData = JSON.stringify("", null, 2);

            const jsonFilePath = path.join(__dirname, './json/user.json');
            const data = JSON.stringify({
                name: username
            }, null, 2);

            // Write the JSON data to a file in the public directory
            fs.writeFile(jsonFilePath, data, (err) => {
                if (err) {
                    res.status(500).send('Error writing to JSON file');
                    return;
                }

                res.status(200).send('JSON file written successfully!');
            });

            res.json({ message: 'Login successful', token });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});
app.get('/api/pc', (req, res) => {
    const sql = 'SELECT product_id, name, description, price, category, brand, ram, ssd, graphics, processor, image_data  FROM pc';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching pc:', err.stack);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});

app.get('/api/monitors', (req, res) => {
    const sql = 'SELECT product_id, name, description, price, category, brand, size, resolution, refresh_rate, image_data  FROM monitors';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching monitors:', err.stack);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});

app.get('/api/accessories', (req, res) => {
    const sql = 'SELECT product_id, name, description, price, category, brand, image_data  FROM monitors';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching accessories:', err.stack);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

