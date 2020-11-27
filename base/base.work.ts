import { Module as NestModule, Type } from "@nestjs/common";
import { controllersImport, servicesImport } from "global/util/app.util";
import { join } from "path";
import { BaseController } from "./base.controller";
import { BaseService } from "./base.service";
import { ExportService } from "./export.service";

export class BaseWork {

    private controllers: BaseController[] = [];
    private services: BaseService[] = [];
    private exports: Type<BaseController | BaseService>[] = [];
    private imports: Type<any>[] = [];

    private module: Type<any> | null = null;

    private dirname: string | null = null;

    static instancesMap: Map<Object, object> = new Map();

    static getInstance() {
        if(!this.instancesMap.has(this)) {
            const instance = new this();
            //@ts-ignore
            instance.dirname = instance.__dirname__;
            this.instancesMap.set(this, instance);
        }
        return this.instancesMap.get(this);
    }

    getDependentModules() {
        return [];
    }

    getModule() {
        if(this.module === null) {
            //@ts-ignore
            const parent: any = this.constructor.__proto__
            if(parent !== BaseWork) {
                const target = parent.getInstance();
                this.imports.push(target.getModule());
            }
            if(this.getDependentModules().length > 0) {
                this.imports.push(...this.getDependentModules());
            }
            const controllersMap: Map<string, Object> = controllersImport(join(this.dirname, "controller"));
            this.controllers = Array.from(controllersMap.values());
            const servicesMap: Map<string, any> = servicesImport(join(this.dirname, "service"));
            this.services = Array.from(servicesMap.values());
            for (let i = 0; i < this.services.length; i++) {
                const service = this.services[i];
                //@ts-ignore
                if(service.__proto__ === ExportService) {
                    //@ts-ignore
                    this.exports.push(service);
                }
            }
            const module = class {};
            NestModule({
                imports: this.imports,
                controllers: this.controllers as Type<any>[],
                providers: this.services as Type<any>[],
                exports: this.exports,
            })(module);
            this.module = module;
        }
        return this.module;
    }
    

    public getExports() {
        return this.exports;
    }

    public getControllers() {
        return this.controllers;
    }

    public getServices() {
        return this.services;
    }


}