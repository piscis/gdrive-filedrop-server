import path from 'path';
import glob from 'glob';

export default (app) => {

  const opts = { cwd: path.resolve(__dirname) };

  glob('*.js', opts, (err, files) => {

    if(err) { throw err; }

    files.forEach((file)=>{
      if (file !== 'index.js') {
        const route = require(path.resolve(__dirname, file)).default;
        route(app);
      }
    });
  });
};
