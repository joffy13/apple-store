import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { ConfirmCodeRequestDto } from './dto/confirm-code-request.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AllResultType } from 'src/lib/types/all-result.type';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOkResponse({
    description: 'Code successfully sent',
    type: AllResultType,
  })
  @Post('send_code')
  sendCode(@Body() dto: RegisterRequestDto) {
    return this.authService.sendMail(dto)
  }

  @ApiCreatedResponse({
    description: 'The user has been successfully authorized.',
    type: AllResultType,
  })
  @Post('confirm_code')
  confirmCode(@Body() dto: ConfirmCodeRequestDto) {
    return this.authService.register(dto)
  }

}
