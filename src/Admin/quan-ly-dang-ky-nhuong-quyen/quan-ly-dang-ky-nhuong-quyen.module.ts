import { Module } from '@nestjs/common';
import { QuanLyDangKyNhuongQuyenService } from './quan-ly-dang-ky-nhuong-quyen.service';
import { QuanLyDangKyNhuongQuyenController } from './quan-ly-dang-ky-nhuong-quyen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyDangKyNhuongQuyenService],
  controllers: [QuanLyDangKyNhuongQuyenController]
})
export class QuanLyDangKyNhuongQuyenModule {}
