import google from 'googleapis';
import config from './config';
import logger from './logger';
import ldMerge from 'lodash/object/merge';

import mailer from 'nodemailer';
import mailerSMTP from 'nodemailer-smtp-transport';

class MailerService {

  constructor(config) {
    this.config = config;
  }

  send(from, to, subject, text, cb = ()=>{}) {

    const config = this.config;

    const smtpTransport = mailerSMTP(config.transport);
    const transport = mailer.createTransport(smtpTransport);
    const optsTMP = {};

    if (from) { optsTMP.from = from; }
    if (to) { optsTMP.to = to; }
    if (subject) { optsTMP.subject = subject; }
    if (text) { optsTMP.text = text; }

    const opts = ldMerge({}, config.formOptions, optsTMP);

    transport.sendMail(opts, (err, info)=>{

      if (err) {
        logger.error(err);
      } else {
        logger.debug('New Mail for upload was send');
        logger.debug(info);
      }

      cb(err, info);
    });
  }

  notifyNewUpload(details = {}, cb = ()=>{}) {

    const {
      description,
      name
    } = details;

    const text = `
      Description: ${ description },
      Name: ${ name }
    `;

    this.send(null, null, 'New foto upload', text, cb);
  }
}

let instance = null;
if (!instance) {
  instance = new MailerService(config.mailer);
}

export default instance;
