import multer from 'multer';
import gdrive from './../services/gdrive';
import config from './../services/config';
import mailer from './../services/mailer';
import path from 'path';
import fs from 'fs';
import logger from './../services/logger';
import uuid from 'node-uuid';

export default (app) => {

  const uploadDir = path.resolve(config.server.uploadDir);
  const upload = multer({dest: uploadDir});

  app.post('/files/upload', upload.array('files', 600), function(req, res, next) {

    const topic = `${req.body.description || '' } / ${req.body.name || ''}`;
    const files = req.files;
    const group = req.body.group || uuid.v4();

    const unlink = (files)=>{
      files.forEach((file)=>{
        fs.unlink(path.resolve(file.path));
      });
    };

    gdrive(topic, files, group).then(function(data) {
      res.status(200).send({success: true});
      unlink(files);

    }).catch(function(e) {
      logger.error('Upload failed', e);
      next();
      unlink(files);
    });

  });

  app.post('/files/ready', function(req, res) {

    const details = {
      description: (req.body.description || ''),
      name: (req.body.name || '')
    };

    mailer.notifyNewUpload(details);
    res.status(200).send({ success: true });
  });
};
