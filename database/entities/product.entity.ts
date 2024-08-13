import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { ProductSpecification } from "./product-specification";
import { ProductTypeEnum } from '../../src/lib/enums/product-type.enum';
import { IsEnum, IsString, IsDate, IsNumber } from "class-validator";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ type: String, description: 'Unique identifier for the product' })
    id: string;

    @Column()
    @ApiProperty({ type: String, description: 'Name of the product' })
    @IsString()
    name: string;

    @Column()
    @ApiProperty({ type: String, description: 'Description of the product' })
    @IsString()
    description: string;

    @Column({ type: 'numeric' })
    @ApiProperty({ type: String, description: 'Price of the product in RUB' })
    @IsString()
    price: string;

    @Column()
    @ApiProperty({ type: Date, description: 'Release date of the product' })
    @IsDate()
    release_date: Date;

    @Column()
    @ApiProperty({ type: Number, description: 'Quantity of the product available in stock' })
    @IsNumber()
    stock_quantity: number;

    @Column({ enum: ProductTypeEnum })
    @ApiProperty({ enum: ProductTypeEnum, description: 'Type of the product (e.g., Phone, Laptop, etc.)' })
    @IsEnum(ProductTypeEnum)
    type: ProductTypeEnum;

    @OneToOne(() => ProductSpecification, { cascade: true })
    @JoinColumn()
    @ApiProperty({ description: 'Specifications of the product' })
    specifications: ProductSpecification;
}
