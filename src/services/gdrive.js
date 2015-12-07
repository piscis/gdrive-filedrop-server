import google from 'googleapis';
import config from './config';
import Promise from 'bluebird';
import async from 'async';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import uuid from 'node-uuid';
import mime from 'mime';

const { keystore, uploadFolderId } = config;
const drive = google.drive('v2');

const scopes = [
  'https://www.googleapis.com/auth/drive'
];

export default function(description = 'NO_DESCRIPTION', files = []) {

  return new Promise(function(resolve, reject) {

    const jwtClient = new google.auth.JWT(keystore.client_email, null, keystore.private_key, scopes, null);

    jwtClient.authorize(function(err) {

      if (err) {
        reject(err);
      } else {

        const folder = `Upload_${moment().format('YYYY-MM-DD_HH:mm:ss')}`;

        drive.files.insert({
          auth: jwtClient,
          resource: {
            title: folder,
            mimeType: 'application/vnd.google-apps.folder',
            description: description,
            parents: [{
              kind: 'drive#fileLink',
              id: uploadFolderId
            }]
          }
        }, function(err, data) {

          if (err) {
            reject(err);
          } else {

            const folderId = data.id;
            const upload = (file, cb) => {

              const filename = `${uuid.v4()}.${mime.extension(file.mimetype)}`;
              const filedesc = `
                Description: ${description}
                Original Filename: ${file.originalname}
              `;

              drive.files.insert({
                auth: jwtClient,
                resource: {
                  title: filename,
                  mimeType: file.mimetype,
                  description: filedesc,
                  parents: [{
                    kind: 'drive#fileLink',
                    id: folderId
                  }]
                },
                media: {
                  mimeType: file.mimetype,
                  body: fs.createReadStream(path.resolve(file.path))
                }
              }, cb);
            };

            async.each(files, upload, function(err) {

              if (err) {
                reject(err);
              } else {
                resolve({success: true});
              }
            });
          }
        });

      }

    });

  });
}
