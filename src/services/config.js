import Hecl from 'hecl';
import path from 'path';

const cfg = new Hecl();

const cfgFiles = [
  path.resolve(__dirname, '../app.config.json'),
  path.resolve(__dirname, '../keystore.config.json'),
  path.resolve(__dirname, '../mailer.config.json')
];

export default cfg.load(cfgFiles).getData();
