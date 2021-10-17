import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiProperty({ example: { username: 'mhmj@gmai.com', password: '12345678' } })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
