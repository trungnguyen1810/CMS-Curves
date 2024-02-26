import { Module } from '@nestjs/common';
import { QuanLyNguonKhachHangService } from './quan-ly-nguon-khach-hang.service';
import { QuanLyNguonKhachHangController } from './quan-ly-nguon-khach-hang.controller';
import {Core} from './../../baseservice/core.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyNguonKhachHangService],
  controllers: [QuanLyNguonKhachHangController]
})
export class QuanLyNguonKhachHangModule {}
