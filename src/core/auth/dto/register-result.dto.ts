import { User } from 'database/entities';

export class RegisterResultDto {
    token: string
    user: User
}
