import { Module } from '@nestjs/common';
import { QuanLyNhomQuyenService } from './quan-ly-nhom-quyen.service';
import { QuanLyNhomQuyenController } from './quan-ly-nhom-quyen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyNhomQuyenService],
  controllers: [QuanLyNhomQuyenController]
})
export class QuanLyNhomQuyenModule {}
