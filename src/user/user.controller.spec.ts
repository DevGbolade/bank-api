// src/controllers/user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [PrismaModule],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
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
        .spyOn(userService, 'createUser')
        .mockResolvedValue({ id: 1, ...createUserDto } as any);

      const result = await userController.createUser(createUserDto);
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

      jest.spyOn(userService, 'getUserById').mockResolvedValue(user as any);

      const result = await userController.getUserById(userId);
      expect(result).toEqual(user);
    });
  });

  describe('updateUserInfo', () => {
    it('should update an existing user', async () => {
      const userId = 1;
      const updateUserDto: UpdateUserDto = { middlename: 'Michael' };

      jest
        .spyOn(userService, 'updateUser')
        .mockResolvedValue({ id: userId, middlename: 'Michael' } as any);

      const result = await userController.updateUserInfo(userId, updateUserDto);
      expect(result).toEqual({ id: userId, middlename: 'Michael' });
    });
  });
});
