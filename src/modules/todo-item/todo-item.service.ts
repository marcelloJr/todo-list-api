import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { TodoItem } from './entities/todo-item.entity';
import Messages from '../../utils/messages/TodoItem';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItem)
    private repository: Repository<TodoItem>,
  ) {}

  create(createTodoItemDto: CreateTodoItemDto) {
    const todoItem = this.repository.create(createTodoItemDto);
    return this.repository.save(todoItem);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id).catch(() => {
      throw new BadRequestException({
        message: Messages.TODO_ITEM_NOT_EXISTS,
      });
    });
  }

  async update(id: number, updateTodoItemDto: UpdateTodoItemDto) {
    const todoItem = await this.repository
      .preload({
        id: id,
        ...updateTodoItemDto,
      })
      .catch(() => {
        throw new BadRequestException({
          message: Messages.TODO_ITEM_NOT_EXISTS,
        });
      });

    return this.repository.save(todoItem);
  }

  async remove(id: number) {
    const todoItem = await this.findOne(id);
    return this.repository.remove(todoItem);
  }
}
