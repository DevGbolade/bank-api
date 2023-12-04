// src/controllers/account.controller.ts
import { Controller, Post, Param, Get, Body } from '@nestjs/common';

import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { TransactionDto, TransferDto } from './dto/accounts.dto';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Account created successfully' })
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.createAccount(createAccountDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Account retrieved successfully' })
  getAccountById(@Param('id') accountId: number) {
    return this.accountService.getAccountById(accountId);
  }

  @Post('credit/account')
  @ApiOkResponse({ description: 'Transaction performed successfully' })
  performTransaction(@Body() transactionDto: TransactionDto) {
    return this.accountService.performTransaction(transactionDto);
  }

  @Post('transfer')
  @ApiOkResponse({ description: 'Funds transferred successfully' })
  transferFunds(@Body() transferDto: TransferDto) {
    return this.accountService.transferFunds(transferDto);
  }
}
