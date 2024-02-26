import { Test, TestingModule } from '@nestjs/testing';
import { CamNangDinhDuongService } from './cam-nang-dinh-duong.service';

describe('CamNangDinhDuongService', () => {
  let service: CamNangDinhDuongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CamNangDinhDuongService],
    }).compile();

    service = module.get<CamNangDinhDuongService>(CamNangDinhDuongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
