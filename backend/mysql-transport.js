// mysql-transport.js
const TransportStream = require('winston-transport');
const mysql = require('mysql2/promise');

class MySQLTransport extends TransportStream {
    constructor(options) {
        super(options);
        this.connection = mysql.createPool(options);
    }

    async log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });

        const { level, message, ...meta } = info;
        const query = 'INSERT INTO logs (level, message, meta) VALUES (?, ?, ?)';

        try {
            await this.connection.query(query, [level, message, JSON.stringify(meta)]);
        } catch (error) {
            console.error('Error inserting log into MySQL', error);
        }

        callback();
    }
}

module.exports = MySQLTransport;
