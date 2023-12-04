import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account, TransactionType } from '@prisma/client';
import { TransactionDto, TransferDto } from './dto/accounts.dto';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    return this.prisma.account.create({
      data: {
        balance: 0,
        accountNumber: this.generateAccountNumber(),
        user: { connect: { id: createAccountDto.userId } },
        type: createAccountDto.type,
      },
    });
  }

  async getAccountById(accountId: number): Promise<Account> {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async performTransaction(transactionDto: TransactionDto): Promise<Account> {
    const account = await this.prisma.account.findUnique({
      where: { id: transactionDto.accountId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    // Performs transaction logic
    account.balance += transactionDto.amount;

    return this.prisma.account.update({
      where: { id: transactionDto.accountId },
      data: { balance: account.balance },
    });
  }

  private generateAccountNumber(): string {
    // Implements account number generation logic
    return String(Math.floor(Math.random() * 10000000000));
  }

  async transferFunds(transferDto: TransferDto) {
    const {
      sourceAccountId,
      destinationAccountId,
      amount,
      type,
      description = '',
    } = transferDto;

    const sourceAccount = await this.prisma.account.findUnique({
      where: { id: sourceAccountId },
    });

    const destinationAccount = await this.prisma.account.findUnique({
      where: { id: destinationAccountId },
    });

    if (!sourceAccount || !destinationAccount) {
      throw new NotFoundException('Source or destination account not found');
    }

    // Check if the source account has sufficient balance
    if (sourceAccount.balance < amount) {
      throw new Error('Insufficient funds in the source account');
    }

    // Perform the funds transfer
    const transactionResult = await this.prisma.$transaction([
      this.prisma.account.update({
        where: { id: sourceAccountId },
        data: { balance: { decrement: amount } },
      }),
      this.prisma.account.update({
        where: { id: destinationAccountId },
        data: { balance: { increment: amount } },
      }),
      this.prisma.transaction.create({
        data: {
          description,
          type: TransactionType.DEBIT,
          amount,
          accountId: destinationAccountId, // Destination account
          originAccountId: sourceAccountId, // Source account
        },
      }),
      this.prisma.transaction.create({
        data: {
          description,
          type: TransactionType.CREDIT,
          amount,
          accountId: destinationAccountId, // Destination account
          originAccountId: sourceAccountId, // Source account
        },
      }),
    ]);
    return transactionResult;
  }
}
