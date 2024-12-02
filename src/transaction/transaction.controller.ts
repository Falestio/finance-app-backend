// transaction.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() transaction: Transaction): Promise<Transaction> {
    return this.transactionService.create(transaction);
  }

  @Get('user/:userId')
  async findAllByUserId(
    @Param('userId') userId: number,
  ): Promise<Transaction[]> {
    return this.transactionService.findAllByUserId(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Req() request: Request,
  ): Promise<Transaction> {
    console.log('Cookies:', request.cookies);

    return this.transactionService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() transaction: Partial<Transaction>,
  ): Promise<Transaction> {
    return this.transactionService.update(id, transaction);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.transactionService.remove(id);
  }
}
