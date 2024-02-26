import { Module } from '@nestjs/common';
import { QuanLyThuocTinhService } from './quan-ly-thuoctinh.service';
import { QuanLyThuocTinhController } from './quan-ly-thuoctinh.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyThuocTinhService],
  controllers: [QuanLyThuocTinhController]
})
export class QuanLyThuocTinhModule {}
