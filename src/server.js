import express  from 'express';
import routes from './routes/index';
import config from './services/config';
import logger from './services/logger';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Enable cors header
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
  next();
});

// Mount routes
routes(app);

const { host } = config.server;
const port = (process.env.PORT || config.server.port);

const server = app.listen(port, host, () => {
  const { address, port } = server.address();
  logger.info('Server listening at http://%s:%s', address, port);
});
