import multer from 'multer';
import gdrive from './../services/gdrive';
import config from './../services/config';
import path from 'path';
import fs from 'fs';
import logger from './../services/logger';

export default (app) => {

  const uploadDir = path.resolve(config.server.uploadDir);
  const upload = multer({dest: uploadDir});

  app.post('/files/upload', upload.array('files', 600), function(req, res, next) {

    const topic = req.body.description;
    const files = req.files;
    const unlink = (files)=>{
      files.forEach((file)=>{
        fs.unlink(path.resolve(file.path));
      });
    };

    gdrive(topic, files).then(function(data) {
      res.status(200).send({success: true});
      unlink(files);
    }).catch(function(e) {
      logger.error('Upload failed', e);
      next();
      unlink(files);
    });

  });
};
