import { Request } from 'express';
import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GetHttpUrlFilterGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const query = req.query ?? {};
    if (query.render) {
      if (query.render === 'html' || query.render === 'json') {
      } else {
        return false;
      }
    }
    return true;
  }
}
