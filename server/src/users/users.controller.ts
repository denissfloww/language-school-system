import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @HttpCode(204)
  @Delete()
  delete(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.deleteUser(deleteUserDto.id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  getAllUsers() {
    try {
      return this.userService.getAllUsers();
    } catch (e) {
      Logger.log(e);
    }
  }
}
