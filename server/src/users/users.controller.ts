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
  Headers,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles-auth.decorator';
import { DeleteUserDto } from './dto/delete-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RolesEnum } from '../auth/roles.enum';
import { JwtService } from '@nestjs/jwt';
import { UpdateLanguageDto } from '../languages/dto/update-language.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateDto);
  }

  @HttpCode(204)
  @Delete()
  delete(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.deleteUser(deleteUserDto.id);
  }

  @Get()
  // @Roles(RolesEnum.Admin)
  // @UseGuards(JwtAuthGuard)
  getAllUsers(@Query() pageOptionsDto: PageOptionsDto) {
    try {
      return this.userService.getAllUserDtos(pageOptionsDto);
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserDtoById(+id);
  }
}
