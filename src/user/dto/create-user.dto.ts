import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({
    example: 'Michael',
    description: 'Middle name of the user',
    required: false,
  })
  @IsOptional()
  readonly middlename?: string;

  @ApiProperty({
    example: 'securepassword',
    description: 'Password of the user',
  })
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;
}
