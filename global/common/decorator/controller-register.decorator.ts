import { Controller as NestController, Type } from '@nestjs/common';
import { registeredControllers } from 'app/registry';

export const Controller = (prefix: string): ClassDecorator => {
    return (target: any) => {
        NestController(prefix)(target);
    }
}