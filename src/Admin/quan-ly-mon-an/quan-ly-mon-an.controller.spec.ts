import { Test, TestingModule } from '@nestjs/testing';
import { QuanLyMonAnController } from './quan-ly-mon-an.controller';

describe('QuanLyMonAnController', () => {
  let controller: QuanLyMonAnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuanLyMonAnController],
    }).compile();

    controller = module.get<QuanLyMonAnController>(QuanLyMonAnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
