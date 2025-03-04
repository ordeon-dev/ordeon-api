import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/decorators/Index.decorator';
import { RequestContext } from 'src/utils/request-context';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const result = await this.authService.loginWithEmail(email, password);

    if (!result) {
      return { message: 'Invalid credentials' };
    }

    return { accessToken: result.access_token, user: result.user };
  }

  @Public()
  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { name, email, password } = body;

    const user = {
      name,
      email,
      password,
    };

    const result = await this.authService.register(user);

    if (!result) {
      return { message: 'Invalid credentials' };
    }

    return {
      accessToken: result.access_token,
      user: result.user,
      message: result.message,
    };
  }

  @Post('complete-setup')
  completeSetup() {
    const user_id = parseInt(RequestContext.get('user_id'));
    const organization_id = parseInt(RequestContext.get('organization_id'));

    return this.authService.completeSetup(user_id, organization_id);
  }
}
