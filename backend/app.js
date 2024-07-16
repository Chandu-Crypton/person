const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const logger = require('./logger'); // Import the logger

const app = express();
const port = 5004;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    logger.info('Root endpoint hit');
    res.send('Hello World');
});

app.post('/api/log', (req, res) => {
    const { level, message } = req.body;
    if (logger[level]) {
        logger[level](message);
        res.status(200).send('Log received');
    } else {
        res.status(400).send('Invalid log level');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

