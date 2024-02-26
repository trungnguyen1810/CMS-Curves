import { Module } from '@nestjs/common';
import { QuanLyKhachHangService } from './quan-ly-khach-hang.service';
import { QuanLyKhachHangController } from './quan-ly-khach-hang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyKhachHangService],
  controllers: [QuanLyKhachHangController]
})
export class QuanLyKhachHangModule {}
