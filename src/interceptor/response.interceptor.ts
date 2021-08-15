import { map, Observable } from 'rxjs';

import {
    CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor
} from '@nestjs/common';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        response: data,
        status: HttpStatus.OK,
        message: 'ok',
      })),
    );
  }
}
