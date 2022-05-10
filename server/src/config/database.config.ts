import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const env = process.env.NODE_ENV;
const data: any = dotenv.parse(fs.readFileSync(`.${env}.env`));

// console.log(__dirname + '../migrations/**/*{.ts,.js}');


export const connectionApp: DataSourceOptions = {
  type: 'postgres',
  host: data.POSTGRES_HOST,
  port: parseInt(data.POSTGRES_PORT),
  username: data.POSTGRES_USERNAME,
  password: data.POSTGRES_PASSWORD,
  database: data.POSTGRES_DATABASE,
  entities: [__dirname + '/../models/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
  synchronize: false,
  logging: true,
};

export const connectionSource = new DataSource({ ...connectionApp });

// export default DatabaseConfig;
