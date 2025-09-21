import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getUsers', () => {
    it('should return users in gRPC response format', async () => {
      const mockUsers = [
        { id: 1, email: 'test@example.com', name: 'Test User' }
      ];
      
      jest.spyOn(appController['appService'], 'getHello').mockResolvedValue(mockUsers);
      
      const result = await appController.getUsers({});
      expect(result).toEqual({ users: mockUsers });
    });
  });
});
