import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import Messages from '../../utils/messages/Users';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('User')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto).catch(() => {
      throw new HttpException(
        {
          message: Messages.password.EMAIL_UNIQUE,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('User')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('User')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id).catch(() => {
      throw new HttpException(
        {
          message: Messages.USER_NOT_EXISTS,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('User')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('User')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
