import { map, Observable } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const isData = req?.query?.render === 'html';
    return next.handle().pipe(
      map((data) =>
        isData
          ? data
          : {
              response: data,
              status: HttpStatus.OK,
              message: 'ok',
            },
      ),
    );
  }
}
