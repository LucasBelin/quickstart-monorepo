import { DataSource, type DataSourceOptions } from 'typeorm';

export const appDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PGHOST ?? 'localhost',
  port: Number(process.env.PGPORT ?? 5432),
  username: process.env.PGUSER ?? 'admin',
  password: process.env.PGPASSWORD ?? 'pass',
  database: process.env.PGDATABASE ?? 'db',
  synchronize: false,
  dropSchema: false,
  schema: 'public',
  entities: ['dist/**/*.entity.js'],
  migrationsRun: true,
  migrations: [`${import.meta.dirname}/migrations/*.{js,ts}`],
  migrationsTableName: 'migrations',
};

export const AppDataSource = new DataSource(appDataSourceOptions);
