import { Module } from '@nestjs/common';
import { CamNangDinhDuongController } from './cam-nang-dinh-duong.controller';
import { CamNangDinhDuongService } from './cam-nang-dinh-duong.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  controllers: [CamNangDinhDuongController],
  providers: [CamNangDinhDuongService]
})
export class CamNangDinhDuongModule {}
