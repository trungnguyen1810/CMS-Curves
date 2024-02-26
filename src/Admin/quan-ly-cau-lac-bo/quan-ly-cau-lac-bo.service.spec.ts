import { Test, TestingModule } from '@nestjs/testing';
import { QuanLyCauLacBoService } from './quan-ly-cau-lac-bo.service';

describe('QuanLyCauLacBoService', () => {
  let service: QuanLyCauLacBoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuanLyCauLacBoService],
    }).compile();

    service = module.get<QuanLyCauLacBoService>(QuanLyCauLacBoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
