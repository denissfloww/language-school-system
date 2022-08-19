import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { RolesModule } from '../roles/roles.module';
import { Role } from '../models/role.entity';
import { AuthModule } from '../auth/auth.module';
import { StudentsModule } from '../students/students.module';
import { TeacherModule } from '../teacher/teacher.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    forwardRef(() => AuthModule),
    StudentsModule,
    TeacherModule,
    HttpModule,
    RolesModule,
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
