import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { OmitType } from '@nestjs/swagger';
import { User } from 'database/entities';

export class UpdateUserDto extends OmitType(User, ["email", "id", "created_at", "updated_at"]) { }
