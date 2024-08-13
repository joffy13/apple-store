import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { User } from "database/entities";
import { RegisterRequestDto } from "./register-request.dto";

export class ConfirmCodeRequestDto extends PickType(RegisterRequestDto, ['email']) {
    @IsString()
    @Length(6)
    @ApiProperty({ description: '6 digits code' })
    code: string
}
