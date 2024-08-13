import { ApiProperty } from "@nestjs/swagger";
import { UserRoleEnum } from "../../src/lib/enums/user-role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, IsEnum, IsString, IsUUID, IsOptional, IsInt, MinLength, MaxLength, IsDate, IsBoolean } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ type: String, description: 'Unique identifier for the user' })
    @IsUUID('4')
    id: string;

    @CreateDateColumn()
    @ApiProperty({ type: Date, description: 'Creation date of the user' })
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @ApiProperty({ type: Date, description: 'Last update date of the user' })
    @IsDate()
    updated_at: Date;

    @Column({ nullable: false })
    @ApiProperty({ type: String, description: 'Email address of the user', required: false })
    @IsEmail()
    @IsOptional()
    email: string;

    @Column({ enum: UserRoleEnum, default: UserRoleEnum.USER })
    @ApiProperty({ enum: UserRoleEnum, description: 'Role of the user' })
    @IsEnum(UserRoleEnum)
    role: UserRoleEnum;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Name of the user', required: false })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsOptional()
    name?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Surname of the user', required: false })
    @IsString()
    @IsOptional()
    surname?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Father\'s name of the user', required: false })
    @IsString()
    @IsOptional()
    fathers_name?: string;

    @Column({ nullable: true })
    @ApiProperty({ enum: ["MALE", "FEMALE", "ANOTHER"], description: 'Gender of the user', required: false })
    @IsString()
    @IsOptional()
    gender?: "MALE" | "FEMALE" | "ANOTHER";

    @Column({ nullable: true })
    @ApiProperty({ type: Number, description: 'Phone number of the user', required: false })
    @IsInt()
    @IsOptional()
    phone?: number;

    @Column({ nullable: true })
    @ApiProperty({ type: Date, description: 'Birthday of the user', required: false })
    @IsDate()
    @IsOptional()
    birthday?: Date;

    @Column({ default: false })
    @ApiProperty({ type: Boolean, description: 'Accepts email notifications' })
    @IsBoolean()
    email_send_accept: boolean;

    @Column({ default: false })
    @ApiProperty({ type: Boolean, description: 'Accepts SMS notifications' })
    @IsBoolean()
    sms_send_accept: boolean;

    @Column({ nullable: true })
    @ApiProperty({ enum: ['HOME', 'ANOTHER'], description: 'Address type', required: false })
    @IsString()
    @IsOptional()
    address_type?: 'HOME' | 'ANOTHER';

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'City of the user\'s address', required: false })
    @IsString()
    @IsOptional()
    city?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Street of the user\'s address', required: false })
    @IsString()
    @IsOptional()
    street?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: Number, description: 'House number of the user\'s address', required: false })
    @IsInt()
    @IsOptional()
    house?: number;

    @Column({ nullable: true })
    @ApiProperty({ type: Number, description: 'Building number of the user\'s address', required: false })
    @IsInt()
    @IsOptional()
    building?: number;

    @Column({ nullable: true })
    @ApiProperty({ type: Number, description: 'Apartment number of the user\'s address', required: false })
    @IsInt()
    @IsOptional()
    apartment?: number;
}