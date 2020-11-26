const { join } = require("path");
const { statSync, mkdirSync, writeFileSync } = require('fs');

const root = join(__dirname, "..", '..');
const app = join(root, "app");

const genWorkTemplate = require('./work-template');
const genServiceTemplate = require('./work-service.template');
const genControllerTemplate = require('./work-controller-template');

let force = false;
let method = null;
let from = null;

let ai = 2;
const name = process.argv[ai++];   //第1个参数  业务的名称
if(name === '-h') {
    console.log("for example: work-d -f extends work-a");
    return ;
}
const _2nd_ = process.argv[ai++];
if(_2nd_ === '-f') {
    force = true;
}else if(_2nd_ === 'extends') {
    method = _2nd_;
}else {
    throw new Error("参数错误");
}

const _3nd_ = process.argv[ai++]; //第2个参数  一般是extends
if(_3nd_) {
    if(!method) {
        method = _3nd_;
    } else {
        from = _3nd_;
    }
}
if(force) {
    from = process.argv[ai++];   //第3个参数  如果第2个参数是extends 则为已存在的业务名称
}

// console.log(name, force, method, from);

if(name === from) {
    console.log("新业务与引用业务相同");
    return ;
}

//创建文件夹
let workPath = join(app, name);
let extendPath = from ? join(app, from) : null;
if(extendPath) {
    try {
        if(!statSync(extendPath).isDirectory()) {
            throw new Error();
        }
    }catch(e) {
        throw new Error(from + "不存在");
    }
}
try {
    if(statSync(workPath).isDirectory()) {
        if(!force) {
            console.log(name + "已存在");
            return ;            
        }
    }else {
        throw new Error();
    }
}catch(e) {
    mkdirSync(workPath, () => {});
}


//创建work.ts
writeFileSync(join(workPath, name + ".work.ts"), genWorkTemplate(name, from), "utf-8");

//创建service/service.ts
const workServicePath = join(workPath, "service");
try {
    if(!statSync(workServicePath).isDirectory()) {
        throw new Error();   
    }
}catch(e) {
    mkdirSync(workServicePath, () => {});
}

writeFileSync(join(workServicePath, name + ".service.ts"), genServiceTemplate(name, from ? join(app, from, "service") : null), "utf-8");

//创建controller.ts
//创建service/service.ts
const workControllerPath = join(workPath, "controller");
try {
    if(!statSync(workControllerPath).isDirectory()) {
        throw new Error();   
    }
}catch(e) {
    mkdirSync(workControllerPath, () => {});
}
writeFileSync(join(workControllerPath, name + ".controller.ts"), genControllerTemplate(name), "utf-8");
