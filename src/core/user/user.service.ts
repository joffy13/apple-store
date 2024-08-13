import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ where: { email } })
    if (!user) {
      throw new NotFoundException(`User with Email ${email} not found`);
    }
    return user
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByEmail(createUserDto.email)
    if (!existingUser) {
      throw new ConflictException(`User with email ${createUserDto.email} already exists`);
    }
    const newUser = this.userRepository.create({ email: createUserDto.email })
    return this.userRepository.save(newUser)
  }

  findAll() {
    return this.userRepository.find()
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneOrFail({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const update = await this.userRepository.update(id, updateUserDto)
    if (update.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.findOne(id)
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      return await this.userRepository.remove(user);
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
