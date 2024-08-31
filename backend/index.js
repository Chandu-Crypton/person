const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const moment = require('moment-timezone');
const logger = require('./logger'); // Import the logger
const axios = require('axios');
const CurrencyConverter = require('currency-converter-lt');
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


let initialSubmissionLogged = false;
let previousCurrency = undefined;
let previousTimezone = undefined;
let previousCountry = undefined;
let previousLanguage = undefined;
let previousContactPhone = undefined;
let initialInfoLogged = false;
app.post('/api/logger1', async (req, res) => {


    try {

        const { avatar, fName, lName, company, contactPhone, companySite, country, language, timeZone, currency } = req.body;

        const { selectedPrice } = req.body;
        // const regionTime = moment.tz(new Date(), `${timeZone}`).format('YYYY-MM-DD HH:mm:ss');
        const regionTimeMoment = moment.tz(new Date(), timeZone);
        const updatedTime = regionTimeMoment.format('ddd MMM DD YYYY HH:mm:ss') + ' GMT' + regionTimeMoment.format('Z');

        // let currencyConverter = new CurrencyConverter();

        // // Define the currency conversion
        // let amount = 1; // Amount to convert
        // let fromCurrency = `${currency}`; // Base currency
        // let toCurrency = 'INR'; // Target currency

        // let convertedAmount;
        // try {
        //     convertedAmount = await currencyConverter
        //         .from(fromCurrency)
        //         .to(toCurrency)
        //         .amount(amount)
        //         .convert();
        //     // .then((response) => {
        //     // console.log(`Converted amount: (${response})`);
        //     console.log(`Converted amount: (${convertedAmount})`);

        //     logger.info(`Converted amount : ${convertedAmount}`)
        //     // responseCurrency = response;
        //     // })
        // } catch (err) {
        //     console.error('Error converting currency:', err);
        //     logger.error('Error converting currency:', err);
        // };





        if ((avatar || fName || lName || company || contactPhone || companySite || country || language || timeZone || currency) && !initialSubmissionLogged) {
            const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
            if (!phoneRegex.test(contactPhone)) {
                logger.warn(`Potentially invalid phone number format: ${contactPhone}`);
            }
            logger.info(`Form data submitted successfully {avatar:${avatar}, fName:${fName}, lName:${lName}, company:${company}, contactPhone:${contactPhone}, companySite:${companySite}, country:${country}, language:${language}, timeZone:${timeZone}, currency:${currency}}`);


            const query = 'INSERT INTO person1 (avatar, fName, lName, company, contactPhone, companySite, country, language, timeZone, currency, updatedTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

            logger.debug('Executing SQL query', {
                query: query,
                values: [avatar, fName, lName, company, contactPhone, companySite, country, language, timeZone, currency, updatedTime]
            });
            connection.query(query, [avatar, fName, lName, company, contactPhone, companySite, country, language, timeZone, currency, updatedTime], (error, results) => {

                if (error) {
                    console.log(error);
                    logger.error('Error inserting data into the database:', error);
                    res.status(500).send('Error inserting data into the database');
                    return;
                }
                logger.debug('Data inserted successfully', { results });
                logger.info("Profile updated.");
                res.status(200).send('Data inserted successfully');
            });
            const { level, message } = req.body;

            logger.log(
                level, message
            );

        }

        if (selectedPrice) {
            logger.info(`Selected Price: ${selectedPrice}`)
        }



        if (!initialInfoLogged && !selectedPrice) {
            logger.info(`Initial currency set to ${currency} at ${updatedTime}`);
            logger.info(`Initial timezone set to ${timeZone} at ${updatedTime}`);
            logger.info(`Initial country set to ${country} at ${updatedTime}`);
            logger.info(`Initial language set to ${language} at ${updatedTime}`);
            logger.info(`Initial contactPhone set to ${contactPhone} at ${updatedTime}`);
            initialInfoLogged = true; // Set flag to true to prevent logging again
        } else if (!selectedPrice) {
            if (previousCurrency !== currency) {
                logger.info(`Currency change detected from ${previousCurrency} to ${currency}`);
            }
            if (previousTimezone !== timeZone) {
                logger.info(`Timezone change detected from ${previousTimezone} to ${timeZone}`);
            }
            if (previousCountry !== country) {
                logger.info(`Country change detected from ${previousCountry} to ${country}`);
            }
            if (previousLanguage !== language) {
                logger.info(`Language change detected from ${previousLanguage} to ${language}`);
            }
            if (previousContactPhone !== contactPhone) {
                logger.info(`ContactPhone change detected from ${previousContactPhone} to ${contactPhone}`);
            }
        }

        previousCurrency = currency;
        previousTimezone = timeZone;
        previousCountry = country;
        previousLanguage = language;
        previousContactPhone = contactPhone;
    }
    catch (error) {

        console.error(error);
        logger.error('Error in request processing:', error);
        res.status(400).send('Error processing request: ' + error.message);
    }

    console.log("req.body", req.body);


});



app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
