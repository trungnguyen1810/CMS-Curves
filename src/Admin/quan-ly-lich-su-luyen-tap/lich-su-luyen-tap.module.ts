import { Module } from '@nestjs/common';
import { LichSuLuyenTapService } from './lich-su-luyen-tap.service';
import { LichSuLuyenTapController } from './lich-su-luyen-tap.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [LichSuLuyenTapService],
  controllers: [LichSuLuyenTapController]
})
export class LichSuLuyenTapModule {}
