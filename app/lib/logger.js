import winston from 'winston';
import Constants from '../config/constants';

export default function(module) {
  let path = '.' + module.filename.split('/').slice(-2).join('/').replace(Constants.root, '');

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: 'debug',
        label: path,
      }),
    ],
  });
}
