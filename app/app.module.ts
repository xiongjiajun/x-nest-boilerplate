import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from 'config/server-config';
import { worksImport } from 'global/util/app.util';
import { AppController } from './app.controller';
import { MongoDatabaseModule } from './mongo-db.module';
import { MySQLDatabaseModule } from './mysql-db.module';

const imports: (DynamicModule | Type<any> | Promise<DynamicModule> | ForwardReference<any>)[] = [ConfigModule.forRoot()];

if(config.useMySQL) {
  imports.push(MySQLDatabaseModule.forRoot());
}
if(config.useMongo) {
  imports.push(MongoDatabaseModule.forRoot());
}

const worksMap = worksImport(__dirname);
const Works = Array.from(worksMap.values());
/**
 * 弄清楚WorkBII extends WorkB的 getInstance为什么是WorkB  因为static
 */

const modules = Works.map((Work) => {
  console.log(Work);
  //@ts-ignore
  const work = Work.getInstance();
  return work?.getModule() || null;
}).filter((work) => work !== null);


@Module({
  imports: imports.concat(modules),
  controllers: [AppController],
})
export class AppModule {}
