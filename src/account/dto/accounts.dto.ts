import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class TransactionDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Account ID', example: 1 })
  accountId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Transaction amount', example: 100 })
  amount: number;
}

export class TransferDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Source Account ID', example: 1 })
  sourceAccountId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Destination Account ID', example: 2 })
  destinationAccountId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Transfer amount', example: 50 })
  amount: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Transfer description',
    example: 'money for enjoyment',
  })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    enum: TransactionType,
    description: 'Transaction type',
    example: TransactionType.DEBIT,
  })
  type: TransactionType;
}
