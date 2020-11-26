const { readFileSync } = require("fs");
const { cross2hump, fileDFS } = require("./util");

module.exports = genServiceTemplate = (name, fromServicePath) => {
    const _className_ = cross2hump(name) + "Service";
    const froms = [];
    fileDFS(fromServicePath, (path, file) => {
        const result = readFileSync(path, "utf-8");
        if(result.includes("extends ExportService")) {
            let servicePathStart = path.indexOf('service\\') + 'service\\'.length;
            let importPath = path.slice(servicePathStart, path.length - '.ts'.length);
            froms.push([file.replace('.service.ts', ''), importPath, cross2hump(file.replace('.service.ts', '') + "Service")])
        }
    });

    return (    
`import { Injectable } from "@nestjs/common";
${froms.map((from) => `import { ${from[2]} } from "app/${from[0]}/service/${from[1]}"\n`)}
@Injectable()
export class ${_className_} {

    constructor(
        ${froms.map((from, index) => {
            return `private readonly ${from[2][0].toLowerCase() + from[2].slice(1, from[2].length)}: ${from[2]}` + (index === from.length - 1 ? "" : ",")
        })}
    ) {}

}
`
    )
}
