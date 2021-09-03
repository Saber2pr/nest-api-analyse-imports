import moment from 'moment';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import winston from 'winston';

import { createOutputPath } from '../utils/env';

export const winstonOptions: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.logstash(),
      ),
      dirname: createOutputPath('logs'),
      filename: `nest:${moment().format('MM-DD')}.log`,
      maxsize: 50 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
};
