import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoCategoryDto } from './dto/create-todo-category.dto';
import { UpdateTodoCategoryDto } from './dto/update-todo-category.dto';
import { TodoCategory } from './entities/todo-category.entity';
import Messages from '../../utils/messages/TodoCategory';

@Injectable()
export class TodoCategoryService {
  constructor(
    @InjectRepository(TodoCategory)
    private repository: Repository<TodoCategory>,
  ) {}

  create(createTodoCategoryDto: CreateTodoCategoryDto) {
    const todoCategory = this.repository.create(createTodoCategoryDto);
    return this.repository.save(todoCategory);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id).then((todoCategory) => {
      if (!todoCategory) {
        throw new BadRequestException({
          message: Messages.TODO_CATEGORY_NOT_EXISTS,
        });
      }
      return todoCategory;
    });
  }

  async update(id: number, updateTodoCategoryDto: UpdateTodoCategoryDto) {
    const todoCategory = await this.repository
      .preload({
        id: id,
        ...updateTodoCategoryDto,
      })
      .catch(() => {
        throw new BadRequestException({
          message: Messages.TODO_CATEGORY_NOT_EXISTS,
        });
      });

    return this.repository.save(todoCategory);
  }

  async remove(id: number) {
    const todoCategory = await this.findOne(id);
    return this.repository.remove(todoCategory).catch(() => {
      throw new BadRequestException({
        message: Messages.TODO_CATEGORY_REFERENCED(todoCategory.description),
      });
    });
  }
}
