// src/dto/account.dto.ts
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '@prisma/client';

export class CreateAccountDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'User ID', example: 1 })
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    enum: AccountType,
    description: 'Account type',
    example: AccountType.SAVINGS,
  })
  type: AccountType;
}
