import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(user: AuthDto) {
    const valideUser = await this.validateUser(user.username, user.password);

    if (valideUser) {
      const payload = { email: valideUser.email, sub: valideUser.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
