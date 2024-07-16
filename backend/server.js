// server.js
const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const MySQLTransport = require('./mysql-transport');

const app = express();
const port = 5002;

// Create a MySQL transport instance
const mySQLTransport = new MySQLTransport({
    host: 'localhost',
    user: 'root',
    password: 'Schandu1#',
    database: 'profile_details',
});

// Create a logger instance with the MySQL transport
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        mySQLTransport,
    ],
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    logger.info('Root endpoint hit');
    res.send('Hello World');
});
// Example endpoint to test logging
app.post('/api/log', (req, res) => {
    const { level, message } = req.body;
    logger.log({ level, message, meta: { additional: 'info' } });
    res.status(200).send('Log message received');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
