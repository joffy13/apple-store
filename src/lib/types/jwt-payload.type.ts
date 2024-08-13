import { UserRoleEnum } from "../enums/user-role.enum"

export class JwtPayloadType {
    id: string
    email: string
    role: UserRoleEnum
}