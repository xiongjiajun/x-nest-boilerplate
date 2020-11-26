import { BaseController } from "base/base.controller";
import { BaseWork } from "base/base.work";
import { BaseService } from "base/base.service";
import { statSync } from "fs";
import { fileDFS, isFileNameSuffix } from './file.util';

const is_ = (type: string, path: string) => {
    if(statSync(path).isDirectory()) {
        return false;
    }
    const splitPath_splash = path.split("\\");
    let fileName = "";
    if(splitPath_splash.length === 1) {
        fileName = splitPath_splash[0];
    }else {
        fileName = splitPath_splash[splitPath_splash.length - 1];
    }
    if(isFileNameSuffix(fileName, `.${type}.js`)) {
        return true;
    }
    return false;
}

export const imports_ = <T>(type: string, path: string, callback: (result: Map<string, T>) => Map<string, T>) => {
    const result: Map<string, any> = new Map();
    fileDFS(path, (path, file) => {
        if(is_(type, path)) {
            const _require_ = require(path);
            const _function_ =  _require_[Object.keys(_require_)[0]];
            if(_function_) {
                result.set(file, _function_);
            }
        }
    });
    if(typeof callback === 'function') {
        return callback(result);
    }
}

export const isController = (path: string) => {
    return is_("controller", path);
 }
 
export const isService = (path: string) => {
    return is_("service", path);
}
 
export const isWork = (path: string) => {
    return is_("work", path);
}

export const modulesImport = (path: string) => {
    return imports_("module", path, (res) => {
        return res;
    });
}

export const controllersImport = (path: string) => {
    return imports_<BaseController>('controller', path, (res) => {
        return res;
    });
}


export const servicesImport = (path: string) => {
    return imports_<BaseService>('service', path, (res) => {
        return res;
    });
}

export const worksImport = (path: string) => {
    return imports_<BaseWork>("work", path, (res) => {
        return res;
    });
}
