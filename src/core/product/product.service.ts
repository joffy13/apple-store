import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'database/entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.productRepository.findOne({ where: { name: createProductDto.name }, relations: { specifications: true } });

    if (existingProduct) {
      throw new BadRequestException(`Product with name ${createProductDto.name} already exists`);
    }

    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    const products = await this.productRepository.find({ relations: { specifications: true } });
    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id }, relations: { specifications: true } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id }, relations: { specifications: true } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const updatedProduct = this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(updatedProduct);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({ where: { id }, relations: { specifications: true } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productRepository.remove(product);
    return { message: `Product with id ${id} has been removed` };
  }
}
