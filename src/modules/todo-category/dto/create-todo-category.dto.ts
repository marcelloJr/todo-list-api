import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Messages from '../../../utils/messages/TodoCategory';

export class CreateTodoCategoryDto {
  @ApiProperty({
    example: 'Purchases',
    description: 'Category Description',
    required: true,
  })
  @IsString({ message: Messages.description.IS_STRING })
  @IsNotEmpty({ message: Messages.description.IS_NOT_EMPTY })
  description: string;
}
