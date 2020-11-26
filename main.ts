import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'app/app.module';
import * as bodyParser from 'body-parser';
import { HttpExceptionFilter } from 'global/common/filter/http-exception.filter';
import { TransformInterceptor } from 'global/common/interceptor/transform.interceptor';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //允许跨域
  app.enableCors();
  //限制请求body大小
  app.use(bodyParser.json({limit: '4MB'}));
  app.use(bodyParser.urlencoded({limit: '20MB', extended: true}));
  //全局response转换
  app.useGlobalInterceptors(new TransformInterceptor());
  //全局http异常处理
  app.useGlobalFilters(new HttpExceptionFilter());
  //配置静态路径
  app.useStaticAssets(join(__dirname, "..", "public"));
  //配置模板引擎目录
  app.setBaseViewsDir(join(__dirname, "..", "view"));
  //设置模板引擎
  app.setViewEngine("hbs");
  //监听端口
  await app.listen(3000);
}


bootstrap();
