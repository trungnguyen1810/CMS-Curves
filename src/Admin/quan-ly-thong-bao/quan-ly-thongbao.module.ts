import { Module } from '@nestjs/common';
import { QuanLyThongBaoService } from './quan-ly-thongbao.service';
import { QuanLyThongBaoController } from './quan-ly-thongbao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyThongBaoService],
  controllers: [QuanLyThongBaoController]
})
export class QuanLyThongBaoModule {}
