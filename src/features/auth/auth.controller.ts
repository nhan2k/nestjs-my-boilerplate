import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/shared/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { PoliciesGuard } from 'src/shared/guards/policies.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Action, AppAbility, User } from 'src/shared/casl/casl-ability.factory';
import { CheckPolicies } from 'src/shared/casl/check-policies';
import { Request as ExRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: ExRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const newAccessToken = await this.authService.refreshAccessToken(
      body.refreshToken,
    );
    return { accessToken: newAccessToken };
  }
}
