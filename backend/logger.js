const { createLogger, format, transports } = require('winston');

const logger = createLogger({

    level: 'debug',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'application.log' })
    ]
});

logger.info('A info log')
logger.error('A error log')
logger.warn('A warn log')
logger.debug('A debug log')
module.exports = logger;
