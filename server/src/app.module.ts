import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { StudentsModule } from './students/students.module';
import { GroupModule } from './group/group.module';

import DatabaseConfig from './config/database.config';

export function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRoot({ ...DatabaseConfig, autoLoadEntities: true });
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    DatabaseOrmModule(),
    UsersModule,
    AuthModule,
    RolesModule,
    StudentsModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
