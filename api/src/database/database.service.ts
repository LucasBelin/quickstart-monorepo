import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppDataSource } from './appdatasource.js';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}
