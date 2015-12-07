import express  from 'express';
import routes from './routes/index';
import config from './services/config';
import logger from './services/logger';

const app = express();

// Enable cors header
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Mount routes
routes(app);

const {port, host} = config.server;
const server = app.listen(port, host, () => {
  const { address, port } = server.address();
  logger.info('Server listening at http://%s:%s', address, port);
});
