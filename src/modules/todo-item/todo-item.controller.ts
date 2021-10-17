import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PriorityEnum } from '../priority/PriorityEnum';

@Controller('todo-item')
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTodoItemDto: CreateTodoItemDto) {
    return this.todoItemService.create(createTodoItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('priorities')
  getAllPriorities() {
    const enums = [];
    const enumsDescription = {
      VERY_LOW: 'Very Low',
      LOW: 'Low',
      NORMAL: 'Normal',
      HIGH: 'High',
      VERY_HIGH: 'Very High',
    };

    Object.keys(PriorityEnum).map((v) => {
      enums.push({
        id: v,
        description: enumsDescription[v],
      });
    });

    return enums;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.todoItemService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoItemService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTodoItemDto: UpdateTodoItemDto,
  ) {
    return this.todoItemService.update(id, updateTodoItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoItemService.remove(id);
  }
}
