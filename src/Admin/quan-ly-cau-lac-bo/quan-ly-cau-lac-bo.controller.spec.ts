import { Test, TestingModule } from '@nestjs/testing';
import { QuanLyCauLacBoController } from './quan-ly-cau-lac-bo.controller';

describe('QuanLyCauLacBoController', () => {
  let controller: QuanLyCauLacBoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuanLyCauLacBoController],
    }).compile();

    controller = module.get<QuanLyCauLacBoController>(QuanLyCauLacBoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
