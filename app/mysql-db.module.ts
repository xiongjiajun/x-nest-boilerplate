import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    providers: [ConfigModule]
})
export class MySQLDatabaseModule {

    static forRoot(): DynamicModule {
        return TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const host = configService.get<string>("MYSQL_HOST");
                const port = configService.get<number>("MYSQL_PORT");
                const username = configService.get<string>("MYSQL_USERNAME");
                const password = configService.get<string>("MYSQL_PASSWORD");
                const database = configService.get<string>("MYSQL_NAME");
                return {
                    type: "mysql",
                    host: host,
                    port: Number(port),
                    username: username,
                    password: password,
                    database: database,
                    entities: ["dist/**/*.entity{.ts}"],
                    synchronize: true,
                }
            },
            inject: [ConfigService],
        });
    }

}