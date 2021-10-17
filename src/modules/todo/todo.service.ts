import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import Messages from '../../utils/messages/Todo';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repository: Repository<Todo>) {}

  create(createTodoDto: CreateTodoDto) {
    const todo = this.repository.create(createTodoDto);
    return this.repository.save(todo);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id).then((todo) => {
      if (!todo) {
        throw new BadRequestException({ message: Messages.TODO_NOT_EXISTS });
      }
      return todo;
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todoList = await this.repository
      .preload({
        id: id,
        ...updateTodoDto,
      })
      .catch(() => {
        throw new BadRequestException({ message: Messages.TODO_NOT_EXISTS });
      });

    return this.repository.save(todoList);
  }

  async remove(id: number) {
    const todoList = await this.findOne(id);
    return this.repository.remove(todoList);
  }
}
