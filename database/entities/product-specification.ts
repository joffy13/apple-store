import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

@Entity()
export class ProductSpecification {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ type: String, description: 'Unique identifier for the specifications' })
    id: string;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Model of the product', required: false })
    @IsString()
    @IsOptional()
    model?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Storage capacity of the product', required: false })
    @IsString()
    @IsOptional()
    storage_capacity?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Color of the product', required: false })
    @IsString()
    @IsOptional()
    color?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Screen size of the product', required: false })
    @IsString()
    @IsOptional()
    screen_size?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: Number, description: 'Battery life of the product in hours', required: false })
    @IsNumber()
    @IsOptional()
    battery_life?: number;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Camera resolution of the product', required: false })
    @IsString()
    @IsOptional()
    camera_resolution?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Processor used in the product', required: false })
    @IsString()
    @IsOptional()
    processor?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Operating system of the product', required: false })
    @IsString()
    @IsOptional()
    operating_system?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: Boolean, description: 'Indicates if the product is wireless', required: false })
    @IsBoolean()
    @IsOptional()
    wireless?: boolean;

    @Column({ nullable: true })
    @ApiProperty({ type: Boolean, description: 'Indicates if the product has noise cancelling feature', required: false })
    @IsBoolean()
    @IsOptional()
    noise_cancelling?: boolean;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Resolution of the monitor or screen', required: false })
    @IsString()
    @IsOptional()
    resolution?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: Number, description: 'Refresh rate of the screen in Hz', required: false })
    @IsNumber()
    @IsOptional()
    refresh_rate?: number;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Types of ports available on the product', required: false })
    @IsString()
    @IsOptional()
    port_types?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Amount of RAM in the product', required: false })
    @IsString()
    @IsOptional()
    ram?: string;

    @Column({ nullable: true })
    @ApiProperty({ type: String, description: 'Connectivity options for the product', required: false })
    @IsString()
    @IsOptional()
    connectivity?: string;
}
