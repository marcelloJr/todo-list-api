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
import { ApiTags } from '@nestjs/swagger';

@Controller('todo-category')
export class TodoCategoryController {
  constructor(private readonly todoCategoryService: TodoCategoryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('Category')
  @Post()
  create(@Body() createTodoCategoryDto: CreateTodoCategoryDto) {
    return this.todoCategoryService.create(createTodoCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Category')
  @Get()
  findAll() {
    return this.todoCategoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Category')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoCategoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Category')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTodoCategoryDto: UpdateTodoCategoryDto,
  ) {
    return this.todoCategoryService.update(id, updateTodoCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Category')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoCategoryService.remove(id);
  }
}
