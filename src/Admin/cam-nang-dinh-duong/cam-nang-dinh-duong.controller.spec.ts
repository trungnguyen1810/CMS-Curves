import { Test, TestingModule } from '@nestjs/testing';
import { CamNangDinhDuongController } from './cam-nang-dinh-duong.controller';

describe('CamNangDinhDuongController', () => {
  let controller: CamNangDinhDuongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CamNangDinhDuongController],
    }).compile();

    controller = module.get<CamNangDinhDuongController>(CamNangDinhDuongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
