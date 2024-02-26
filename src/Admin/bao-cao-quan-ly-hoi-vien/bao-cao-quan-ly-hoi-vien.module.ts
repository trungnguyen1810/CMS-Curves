import { Module } from '@nestjs/common';
import { BaoCaoQuanLyHoiVienService } from './bao-cao-quan-ly-hoi-vien.service';
import { BaoCaoHoiVienController } from './bao-cao-quan-ly-hoi-vien.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from '../../baseservice/core.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [BaoCaoQuanLyHoiVienService],
  controllers: [BaoCaoHoiVienController]
})
export class BaoCaoQuanLyHoiVienModule {}
