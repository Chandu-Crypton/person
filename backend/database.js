const { mysql } = require('mysql2')
const express = require('express')

const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Schandu1#',
    database: 'profile_details'
})

connection.connect(function (error) {
    if (error) throw error
    else console.log('connected to the database successfully')
})


app.get

app.listen(4001)