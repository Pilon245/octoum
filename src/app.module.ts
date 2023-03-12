import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ListModule } from './list/list.module';
import { DeleteModule } from './test/delete.module';

@Module({
  imports: [
    CitiesModule,
    ListModule,
    DeleteModule,
    ConfigModule.forRoot({
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
