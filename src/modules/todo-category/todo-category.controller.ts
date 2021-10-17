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
import { TodoCategoryService } from './todo-category.service';
import { CreateTodoCategoryDto } from './dto/create-todo-category.dto';
import { UpdateTodoCategoryDto } from './dto/update-todo-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todo-category')
export class TodoCategoryController {
  constructor(private readonly todoCategoryService: TodoCategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTodoCategoryDto: CreateTodoCategoryDto) {
    return this.todoCategoryService.create(createTodoCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.todoCategoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoCategoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTodoCategoryDto: UpdateTodoCategoryDto,
  ) {
    return this.todoCategoryService.update(id, updateTodoCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoCategoryService.remove(id);
  }
}
