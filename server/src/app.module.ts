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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { StudentsModule } from './students/students.module';
import { GroupModule } from './group/group.module';
import { TeacherModule } from './teacher/teacher.module';

import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LessonTypesModule } from './lesson-types/lesson-types.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { GroupProfile } from './group/mappings/group.map';
import { StudentProfile } from './students/student.map';
import { ScheduleModule } from './schedule/schedule.module';
import { LanguagesModule } from './languages/languages.module';
import { CostsModule } from './costs/costs.module';
import { FeedsModule } from './feeds/feeds.module';
import { AttendanceModule } from './attendance/attendance.module';
import { MailModule } from './mail/mail.module';
import { CalculateModule } from './calculate/calculate.module';
import { TasksModule } from './tasks/tasks.module';
// import { connectionApp } from './config/database.config';
import { UserProfile } from './users/mappings/user.map';
import { RoleProfile } from './roles/mappings/role.map';
import { TestsModule } from './tests/tests.module';
import { ReportsModule } from './reports/reports.module';
import dbConfiguration from './config/database.config';

export function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      ...configService.get('database'),
    }),
  });
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [dbConfiguration],
    }),
    DatabaseOrmModule(),
    AutomapperModule.forRoot({
      options: [{ name: 'blah', pluginInitializer: classes }],
      singular: true,
    }),
    UsersModule,
    MailModule,
    AuthModule,
    RolesModule,
    StudentsModule,
    GroupModule,
    TeacherModule,
    LessonTypesModule,
    GroupProfile,
    UserProfile,
    RoleProfile,
    StudentProfile,
    ScheduleModule,
    LanguagesModule,
    CostsModule,
    FeedsModule,
    AttendanceModule,
    CalculateModule,
    TasksModule,
    TestsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
