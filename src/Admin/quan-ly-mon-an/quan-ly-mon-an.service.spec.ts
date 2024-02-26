import { Test, TestingModule } from '@nestjs/testing';
import { QuanLyMonAnService } from './quan-ly-mon-an.service';

describe('QuanLyMonAnService', () => {
  let service: QuanLyMonAnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuanLyMonAnService],
    }).compile();

    service = module.get<QuanLyMonAnService>(QuanLyMonAnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
