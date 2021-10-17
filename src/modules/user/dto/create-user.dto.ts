import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Messages from '../../../utils/messages/Users';

export class CreateUserDto {
  @ApiProperty({
    example: 'Bill Gates',
    nullable: false,
    required: true,
    description: `User's full name`,
  })
  @IsString({ message: Messages.fullName.IS_STRING })
  @IsNotEmpty({ message: Messages.fullName.IS_NOT_EMPTY })
  fullName: string;

  @ApiProperty({
    example: 'person@gmail.com',
    nullable: false,
    required: true,
    uniqueItems: true,
    description: 'A valid email',
  })
  @IsEmail({}, { message: Messages.email.IS_STRING })
  @IsNotEmpty({ message: Messages.fullName.IS_NOT_EMPTY })
  email: string;

  @ApiProperty({
    nullable: false,
    required: true,
    minLength: 8,
    example: '@#StrongPassword!!@',
  })
  @IsString({ message: Messages.password.IS_STRING })
  @IsNotEmpty({ message: Messages.password.IS_NOT_EMPTY })
  @MinLength(8, { message: Messages.password.MIN_LENGTH })
  password: string;
}
