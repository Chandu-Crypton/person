const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const logger = require('./logger'); // Import the logger

const app = express();
const port = 5002;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Schandu1#',
    database: 'react'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});


app.get('/', (req, res) => {
    logger.info('Root endpoint hit');
    res.send('Hello World');
});

app.post('/api/logger1', (req, res) => {
    const { fName, lName, company, contactPhone, companySite, country, language, timeZone, currency } = req.body;
    const { level, message } = req.body;
    logger.log(
        level, message
    );
    console.log("req.body", req.body);
    // if (!phone_number) {
    //     return res.status(400).send('Phone number is required');
    // }
    // Insert the data into the database
    const query = 'INSERT INTO person (fName, lName, company, contactPhone, companySite, country, language, timeZone, currency ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(query);
    connection.query(query, [fName, lName, company, contactPhone, companySite, country, language, timeZone, currency], (error, results) => {
        console.log(results, error);
        if (error) {
            console.error('Error inserting data into the database:', error);
            res.status(500).send('Error inserting data into the database');
            return;
        }

        res.status(200).send('Data inserted successfully');
    });

});

// app.post('/api/logger1', (req, res) => {
//     const { level, message } = req.body;
//     if (logger[level]) {
//         logger[level](message);
//         res.status(200).send('Log received');
//     } else {
//         res.status(400).send('Invalid log level');
//     }
// });

app.post('/api/logger1', (req, res) => {
    const { level, message } = req.body;

    if (!level || !message) {
        return res.status(400).send('Level and message are required');
    }

    // Log the message
    logger.log({
        level, message
    });

    res.status(200).send('Log message received');
});


app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
