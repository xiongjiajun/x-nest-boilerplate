import { Injectable as NestInjectable, Type } from '@nestjs/common';
import { registeredProviders } from 'app/registry';

export const Controller = (module: Type<any>): ClassDecorator => {
    return (target: any) => {
        console.log(target);
        if(registeredProviders.has(module)) {
            registeredProviders.get(module).push(target);
        }else {
            registeredProviders.set(module, [target]);
        }
        NestInjectable()(target);
    }
}