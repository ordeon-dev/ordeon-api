import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContext } from './request-context';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    RequestContext.run(() => {
      RequestContext.set('organization_id', req.headers.organization_id);
      RequestContext.set('user_id', req.headers.user_id);
      next();
    });
  }
}