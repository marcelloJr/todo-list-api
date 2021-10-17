import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PriorityEnum } from '../../priority/PriorityEnum';
import Messages from '../../../utils/messages/TodoItem';
import { Todo } from '../../todo/entities/todo.entity';

export class CreateTodoItemDto {
  @IsString({ message: Messages.description.IS_STRING })
  @IsNotEmpty({ message: Messages.description.IS_NOT_EMPTY })
  description: string;

  @IsOptional()
  @IsEnum(PriorityEnum, { message: Messages.priority.IS_ENUM })
  priority: PriorityEnum;

  @IsNotEmpty({ message: Messages.todoList.IS_NOT_EMPTY })
  todoList: Todo;
}
