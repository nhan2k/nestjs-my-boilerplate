import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: Cat[] = [
        {
          name: 'test',
          age: 1,
          breed: 'test',
        },
      ];
      jest.spyOn(catsService, 'findAll').mockImplementation(async () => result);
      const req: any = {};
      const res: any = {};

      expect(await catsController.findAll(req, res)).toBe(result);
    });
  });
});
