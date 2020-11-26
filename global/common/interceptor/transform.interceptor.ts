import { Injectable, NestInterceptor, ExecutionContext, CallHandler,  } from '@nestjs/common';
import { Request } from 'express';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
// import { logger } from 'src/utils/logger.util';

export interface Response<T> {
    data: T,
    message: string
}

const blackList = ['/status']

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> | Observable<any> {
        const request: Request = context.switchToHttp().getRequest();
        if(blackList.includes(request.url)) {
            return next.handle();
        }
        return next.handle().pipe(map((data, message) => {
            return {
                code: 0,
                msg: message || 'success',
                data: data,
            }
        }));
    }

}