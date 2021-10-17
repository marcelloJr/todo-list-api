import {
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TodoCategory } from '../../todo-category/entities/todo-category.entity';
import Messages from '../../../utils/messages/Todo';
import { TodoItem } from '../../todo-item/entities/todo-item.entity';
import { Timestamp } from 'typeorm';
import { PriorityEnum } from 'src/modules/priority/PriorityEnum';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Monday supermarket list',
    nullable: false,
    required: true,
    description: 'Description of the TODO list',
  })
  @IsString({ message: Messages.description.IS_STRING })
  @IsNotEmpty({ message: Messages.description.IS_NOT_EMPTY })
  description: string;

  @ApiPropertyOptional({
    example: '#8732a8',
    required: false,
    nullable: true,
    description: 'Color for backgroung card. Is must be a hex color',
  })
  @IsOptional()
  @Length(0, 7, { message: Messages.cardColor.LENGTH })
  @IsHexColor({ message: Messages.cardColor.NOT_HEX_COLOR })
  cardColor?: string;

  // @ApiPropertyOptional({
  //   required: false,
  //   nullable: true,
  //   description: 'TODO list expiration date',
  // })
  @IsOptional()
  dueDate?: Timestamp;

  @ApiPropertyOptional({
    example: 1,
    required: false,
    nullable: true,
    description: 'TODO list category',
  })
  @IsOptional()
  category?: TodoCategory;

  @ApiPropertyOptional({
    example: [
      {
        description: 'Get 1kg of chicken breast',
        priority: PriorityEnum.VERY_HIGH,
      },
    ],
    required: false,
    nullable: true,
    description: 'Array of items for TODO list',
  })
  @IsOptional()
  items?: Array<TodoItem>;
}
