import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Post,
  UseGuards,
  Put,
  Req,
  Headers,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DeleteUserDto } from './dto/delete-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RolesEnum } from '../auth/roles.enum';
import { ChangePasswordByAdminDto } from './dto/change-password-by-admin.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

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
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    try {
      return this.userService.getAllUsers();
    } catch (e) {
      Logger.log(e);
    }
  }

  @Put('/change/password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() dto: ChangePasswordDto, @Headers() headers) {
    const jwtToken = headers['authorization'].split(' ')[1];
    const userJwtInfo = this.jwtService.decode(jwtToken);
    const userId = userJwtInfo['id'];
    await this.userService.changePassword(dto, userId);
  }

  // @UseGuards(RolesGuard)
  // @Roles(RolesEnum.Admin)
  // @UseGuards(JwtAuthGuard)
  // async changePasswordByAdmin(@Body() dto: ChangePasswordByAdminDto) {}
}
