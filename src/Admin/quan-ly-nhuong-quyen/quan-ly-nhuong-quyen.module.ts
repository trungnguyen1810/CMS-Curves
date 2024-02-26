import { Module } from '@nestjs/common';
import { QuanLyNhuongQuyenService } from './quan-ly-nhuong-quyen.service';
import { QuanLyNhuongQuyenController } from './quan-ly-nhuong-quyen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyNhuongQuyenService],
  controllers: [QuanLyNhuongQuyenController]
})
export class QuanLyNhuongQuyenModule {}
