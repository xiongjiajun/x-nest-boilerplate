const { cross2hump } = require('./util');
module.exports = genWorkTemplate = (name, from) => {
    const _className_ = cross2hump(name) + "Work";
    const _workImports_ = from ? `import { ${cross2hump(from) + "Work"} } from "app/${from}/${from}.work";` : 'import { BaseWork } from "base/base.work";';
    const _workExtends_ = from ? `${cross2hump(from) + "Work"}` : "BaseWork";

    return (
`import { dirname } from "global/common/decorator/work-dirname.decorator";
${_workImports_}

@dirname(__dirname)
export class ${_className_} extends ${_workExtends_} { 

}`  );
}