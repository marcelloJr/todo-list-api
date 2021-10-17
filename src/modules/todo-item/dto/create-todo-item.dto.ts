import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PriorityEnum } from '../../priority/PriorityEnum';
import Messages from '../../../utils/messages/TodoItem';
import { Todo } from '../../todo/entities/todo.entity';

export class CreateTodoItemDto {
  @ApiProperty({
    example: 'Get 1kg of chicken breast',
    description: 'TODO list item description',
    required: true,
  })
  @IsString({ message: Messages.description.IS_STRING })
  @IsNotEmpty({ message: Messages.description.IS_NOT_EMPTY })
  description: string;

  @ApiPropertyOptional({
    example: 'VERY_LOW',
    description: 'Item list priority',
    required: false,
    default: 'NORMAL',
    enum: PriorityEnum,
  })
  @IsOptional()
  @IsEnum(PriorityEnum, { message: Messages.priority.IS_ENUM })
  priority: PriorityEnum;

  @IsNotEmpty({ message: Messages.todoList.IS_NOT_EMPTY })
  todoList: Todo;
}
