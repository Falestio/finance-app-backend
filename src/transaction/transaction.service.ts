import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.save(transaction);
  }

  async findAllByUserId(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.find({ where: { userId } });
  }

  async findOne(id: number): Promise<Transaction> {
    return this.transactionRepository.findOneBy({ id });
  }

  async update(
    id: number,
    transaction: Partial<Transaction>,
  ): Promise<Transaction> {
    await this.transactionRepository.update(id, transaction);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
