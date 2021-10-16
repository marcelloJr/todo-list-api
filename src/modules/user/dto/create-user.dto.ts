import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import Messages from 'src/utils/messages/Users';

export class CreateUserDto {
  @IsString({ message: Messages.fullName.IS_STRING })
  @IsNotEmpty({ message: Messages.fullName.IS_NOT_EMPTY })
  fullName: string;

  @IsEmail({}, { message: Messages.email.IS_STRING })
  @IsNotEmpty({ message: Messages.fullName.IS_NOT_EMPTY })
  email: string;

  @IsString({ message: Messages.password.IS_STRING })
  @IsNotEmpty({ message: Messages.password.IS_NOT_EMPTY })
  @MinLength(8, { message: Messages.password.MIN_LENGTH })
  password: string;
}
