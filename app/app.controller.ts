import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { BaseController } from '../base/base.controller';

@Controller()
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get()
  index(@Res() res: Response) {
    return res.render("index", {message: 'Hello world!' });
  }

  // error pages begin
  @Get('/403')
  forbidden(@Res() res: Response) {
    return res.render("error/403");
  } 

  @Get('/404')
  notFound(@Res() res: Response) {
    return res.render("error/404");
  }

  @Get('/500')
  internetServerError(@Res() res: Response) {
    return res.render("error/404");
  }
  //error pages end
}
