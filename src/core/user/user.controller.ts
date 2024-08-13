import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'database/entities';
import { AllResultType } from './../../lib/types/all-result.type'
import { RolesGuard } from 'src/lib/guards/role.guard';
import { UserRoles } from 'src/lib/decorators/user-roles.decorator';
import { UserRoleEnum } from 'src/lib/enums/user-role.enum';
import { JwtAuthGuard } from 'src/lib/guards/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRoles(UserRoleEnum.ADMIN)
  @ApiFoundResponse({
    description: 'The users array has been successfully found.',
    type: AllResultType<User[]>,
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiFoundResponse({
    description: 'The user has been successfully found by id.',
    type: AllResultType<User>,
  })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiFoundResponse({
    description: 'The user has been successfully found by id.',
    type: AllResultType<User>,
  })
  @Get('/me')
  findMe(@Req() req: any) {
    const userId = req.user['id']
    return this.userService.findOne(userId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'The user has been successfully updated.',
    type: AllResultType<User>,
  })
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'The user has been successfully updated.',
    type: AllResultType<User>,
  })
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.remove(id);
  }
}
