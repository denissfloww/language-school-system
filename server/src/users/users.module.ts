import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { RolesModule } from '../roles/roles.module';
import { Role } from '../models/role.entity';
import { AuthModule } from '../auth/auth.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RolesModule,
    forwardRef(() => AuthModule),
    StudentsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
