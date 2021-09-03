import { Request } from 'express';
import { map, Observable } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(
      map((data) => {
        let response = {
          response: data,
          status: HttpStatus.OK,
          message: 'ok',
        };
        if (req?.query?.render === 'html') {
          response = data;
        }
        this.logger.log(response);
        return response;
      }),
    );
  }
}
