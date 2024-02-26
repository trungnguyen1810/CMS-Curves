import { Module } from '@nestjs/common';
import { QuanLyKhachHangTiemNangService } from './quan-ly-khach-hang-tiem-nang.service';
import { QuanLyKhachHangTiemNangController } from './quan-ly-khach-hang-tiem-nang.controller';
import {Core} from './../../baseservice/core.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyKhachHangTiemNangService],
  controllers: [QuanLyKhachHangTiemNangController]
})
export class QuanLyKhachHangTiemNangModule {}
