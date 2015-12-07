import express  from 'express';
import routes from './routes/index';
import config from './services/config';
import logger from './services/logger';

const app = express();

// Mount routes
routes(app);

const {port, host} = config.server;
const server = app.listen(port, host, () => {
  const { address, port } = server.address();
  logger.info('Server listening at http://%s:%s', address, port);
});
