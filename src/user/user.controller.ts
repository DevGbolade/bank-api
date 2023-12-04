// src/controllers/user.controller.ts
import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User created successfully' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User retrieved successfully' })
  getUserById(@Param('id') userId: number) {
    return this.userService.getUserById(userId);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'User updated successfully' })
  updateUserInfo(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
