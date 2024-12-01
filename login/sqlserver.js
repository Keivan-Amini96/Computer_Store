const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');

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
    const { username, password } = req.body;
    db.execute('SELECT pd FROM users WHERE un = ?', [username], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        if(password === user.pd) {
            const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

