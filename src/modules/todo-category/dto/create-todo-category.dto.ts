import { IsNotEmpty, IsString } from 'class-validator';
import Messages from '../../../utils/messages/TodoCategory';

export class CreateTodoCategoryDto {
  @IsString({ message: Messages.description.IS_STRING })
  @IsNotEmpty({ message: Messages.description.IS_NOT_EMPTY })
  description: string;
}
