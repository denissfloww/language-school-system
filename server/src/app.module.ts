import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { StudentsModule } from './students/students.module';
import { GroupModule } from './group/group.module';
import { TeacherModule } from './teacher/teacher.module';

import DatabaseConfig from './config/database.config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LessonTypesModule } from './lesson-types/lesson-types.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { GroupProfile } from './group/mappings/group.map';
import { StudentProfile } from './students/student.map';

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
    AutomapperModule.forRoot({
      options: [{ name: 'blah', pluginInitializer: classes }],
      singular: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    StudentsModule,
    GroupModule,
    TeacherModule,
    LessonTypesModule,
    GroupProfile,
    StudentProfile,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
