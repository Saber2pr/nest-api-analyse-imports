import { map, Observable } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Request } from 'express';

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
