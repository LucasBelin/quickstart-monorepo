import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSourceOptions } from './database/appdatasource.js';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSourceOptions),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
