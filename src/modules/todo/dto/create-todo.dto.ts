import {
  IsDate,
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { TodoCategory } from '../../todo-category/entities/todo-category.entity';
import Messages from '../../../utils/messages/Todo';
import { TodoItem } from '../../todo-item/entities/todo-item.entity';
import { Timestamp } from 'typeorm';

export class CreateTodoDto {
  @IsString({ message: Messages.description.IS_STRING })
  @IsNotEmpty({ message: Messages.description.IS_NOT_EMPTY })
  description: string;

  @IsOptional()
  @Length(0, 7, { message: Messages.cardColor.LENGTH })
  @IsHexColor({ message: Messages.cardColor.NOT_HEX_COLOR })
  cardColor?: string;

  @IsOptional()
  dueDate?: Timestamp;

  @IsOptional()
  category?: TodoCategory;

  @IsOptional()
  items?: Array<TodoItem>;
}
