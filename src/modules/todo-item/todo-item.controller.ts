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
import { ApiTags } from '@nestjs/swagger';

@Controller('todo-item')
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('Item')
  @Post()
  create(@Body() createTodoItemDto: CreateTodoItemDto) {
    return this.todoItemService.create(createTodoItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Priority')
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
  @ApiTags('Item')
  @Get()
  findAll() {
    return this.todoItemService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Item')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoItemService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Item')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTodoItemDto: UpdateTodoItemDto,
  ) {
    return this.todoItemService.update(id, updateTodoItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Item')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoItemService.remove(id);
  }
}
