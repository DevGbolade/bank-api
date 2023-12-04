import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'Michael',
    description: 'Updated middle name of the user',
    required: false,
  })
  @IsOptional()
  readonly middlename?: string;

  @ApiProperty({
    example: 'newsecurepassword',
    description: 'Updated password of the user',
    required: false,
  })
  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password?: string;
}
