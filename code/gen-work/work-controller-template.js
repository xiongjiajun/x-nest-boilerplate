const { cross2hump } = require("./util")

module.exports = genControllerTemplate = (name, from) => {
    const campName = cross2hump(name);
    return (
`import { Get, Post, Put, Delete, Query, Body } from "@nestjs/common";
import { APIv1 } from "global/common/decorator/api-v1.decorator";
import { ${campName}Service } from "../service/${name}.service";

@APIv1("${name}}")
export class ${campName}Controller {

    constructor(
        private readonly ${campName[0].toLowerCase() + campName.slice(1, campName.length)}Service: ${campName}Service,
    ) {}

    @Get()
    getMethod(@Query() query) {
        //TODO
    }

    @Post()
    postMethod(@Body() body) {
        //TODO
    }

    @Put()
    putMethod(@Body() body) {
        //TODO
    }

    @Delete()
    deleteMethod(@Body() body) {
        //TODO
    }

}`
    )
}

