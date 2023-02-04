import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body) {
    const { email, password, name } = body;
    return this.authService.signUp(email, password, name);
  }

  @Post('login')
  async login(@Body() body) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}
