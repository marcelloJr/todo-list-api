import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import Messages from '../../utils/messages/TodoItem';
import { ApiTags } from '@nestjs/swagger';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('To do')
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto).catch((err: any) => {
      if (err.routine === 'enum_in') {
        throw new BadRequestException({
          message: Messages.priority.IS_ENUM,
        });
      }
      throw new InternalServerErrorException();
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('To do')
  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('To do')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('To do')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('To do')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(id);
  }
}
