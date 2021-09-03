import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}
  use(req: Request, res: Response, next: () => void) {
    next();
    const log = {
      originalUrl: req.originalUrl,
      statusCode: res.statusCode,
      params: req.params,
      query: req.query,
      body: req.body,
      headers: req.headers,
    };
    if (log.statusCode >= 500) {
      this.logger.error(log);
    } else if (log.statusCode >= 400) {
      this.logger.warn(log);
    } else {
      this.logger.log(log);
    }
  }
}
