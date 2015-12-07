import winston from 'winston';
import config from './config';

const logger = new (winston.Logger)({
  level: config.logger.level,
  transports: [
    new (winston.transports.Console)()
  ]
});

export default logger;
