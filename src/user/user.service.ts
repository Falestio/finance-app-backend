import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updateUsername(id: number, username: string): Promise<User> {
    // Find the user first
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found'); // Handle user not found case
    }

    // Update the username
    user.username = username;
    await this.userRepository.save(user); // Save the updated user

    return user; // Return the updated user
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
