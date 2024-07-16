const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL host
    user: 'root', // Replace with your MySQL user
    password: 'Schandu1#', // Replace with your MySQL password
    database: 'metronic' // Replace with your database name
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Endpoint to handle POST requests from the frontend
app.post('/api/log', (req, res) => {
    const { Name, Email, Password } = req.body;

    // Insert the data into the database
    const query = 'INSERT INTO Log2 (Name, Email, Password) VALUES (?, ?, ?)';
    connection.query(query, [Name, Email, Password], (error, results) => {
        if (error) {
            console.error('Error inserting data into the database:', error);
            res.status(500).send('Error inserting data into the database');
            return;
        }

        res.status(200).send('Data inserted successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
