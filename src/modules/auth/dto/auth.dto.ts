import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'person@gmail.com',
    required: true,
  })
  username: string;

  @ApiProperty({
    example: '@#StrongPassword#@',
    required: true,
  })
  password: string;
}
