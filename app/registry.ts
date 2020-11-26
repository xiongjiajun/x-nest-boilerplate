import { Type } from "@nestjs/common";
import { BaseWork } from "base/base.work";

export const registeredModules: BaseWork[] = [];
export const registeredControllers: Map<Type<any>, Type<any>[]> = new Map();
export const registeredProviders: Map<Type<any>, Type<any>[]> = new Map();
export const registeredWorks: BaseWork[] = [];