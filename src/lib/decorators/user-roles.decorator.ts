import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../enums/user-role.enum';

export const UserRoles = (...roles: UserRoleEnum[]) => SetMetadata('roles', roles);