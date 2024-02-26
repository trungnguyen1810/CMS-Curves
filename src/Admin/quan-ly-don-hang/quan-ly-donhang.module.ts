import { Module } from '@nestjs/common';
import { QuanLyDonHangService } from './quan-ly-donhang.service';
import { QuanLyDonHangController } from './quan-ly-donhang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyDonHangService],
  controllers: [QuanLyDonHangController]
})
export class QuanLyDonHangModule {}
