import { Module as NestModule } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces';
import { registeredControllers, registeredModules, registeredProviders } from 'app/registry';




export function Module(reflectMetadata?: {imports?: Type<any>[], exports?: Type<any>[]}) {
    const { imports, exports } = reflectMetadata || {};
    return (target: any) => {
        registeredModules.push(target);
        console.log(target.name);
        NestModule({
            imports: imports || [],
            controllers: registeredControllers.get(target) || [],
            providers: registeredProviders.get(target) || [],
            exports: exports || [],
        })(target);
    }
}