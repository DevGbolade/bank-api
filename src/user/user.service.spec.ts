// src/services/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        firstname: 'John',
        lastname: 'Doe',
        password: 'securepassword',
        email: 'john.doe@example.com',
      };

      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue({ id: 1, ...createUserDto } as any);

      const result = await userService.createUser(createUserDto);
      expect(result).toEqual({ id: 1, ...createUserDto });
    });
  });

  describe('getUserById', () => {
    it('should retrieve a user by ID', async () => {
      const userId = 1;
      const user = {
        id: userId,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
      };

      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(user as any);

      const result = await userService.getUserById(userId);
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const userId = 1;

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(userService.getUserById(userId)).rejects.toThrowError(
        'User not found',
      );
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const userId = 1;
      const updateUserDto: UpdateUserDto = { middlename: 'Michael' };

      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue({ id: userId, middlename: 'OldMiddleName' } as any);
      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValue({ id: userId, middlename: 'Michael' } as any);

      const result = await userService.updateUser(userId, updateUserDto);
      expect(result).toEqual({ id: userId, middlename: 'Michael' });
    });

    it('should throw NotFoundException when user is not found', async () => {
      const userId = 1;
      const updateUserDto: UpdateUserDto = { middlename: 'Michael' };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(
        userService.updateUser(userId, updateUserDto),
      ).rejects.toThrowError('User not found');
    });
  });
});
