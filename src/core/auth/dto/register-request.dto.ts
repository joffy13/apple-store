import { PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";
import { User } from "database/entities";

export class RegisterRequestDto {
    @ApiProperty({ type: String, description: 'Email address of the user', required: true })
    @IsEmail()
    email: string;
}
