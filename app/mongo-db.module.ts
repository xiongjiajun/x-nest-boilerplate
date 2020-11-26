import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    providers: [ConfigModule]
})
export class MongoDatabaseModule {

    static forRoot(): DynamicModule {
        return MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const connectionName = configService.get<string>("MONGODB_CONNECTION_NAME");
                return {
                    connectionName,
                }
            },
            inject: [ConfigService],
        });
    }

}