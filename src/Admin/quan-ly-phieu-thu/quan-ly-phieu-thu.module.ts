import { Module } from '@nestjs/common';
import { QuanLyPhieuThuService } from './quan-ly-phieu-thu.service';
import { QuanLyPhieuThuController } from './quan-ly-phieu-thu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyPhieuThuService],
  controllers: [QuanLyPhieuThuController]
})
export class QuanLyPhieuThuModule {}
