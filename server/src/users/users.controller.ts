import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
  StreamableFile,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DeleteUserDto } from './dto/delete-user.dto';
import * as stream from 'stream';
import { createReadStream } from 'fs';
import { join } from 'path';
import { doc } from 'prettier';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // // @UseGuards(JwtAuthGuard)
  // @Post()
  // create(
  //   @Body() createUserDto: CreateUserDto,
  //   @Response({ passthrough: true }) res,
  // ): StreamableFile {
  //   const file = createReadStream(join(process.cwd(), 'package.json'));
  //   res.set({
  //     'Content-Type': 'application/json',
  //     'Content-Disposition': 'attachment; filename="package.json"',
  //   });
  //   return new StreamableFile(file);
  //   //return this.userService.createUser(createUserDto);
  // }

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
