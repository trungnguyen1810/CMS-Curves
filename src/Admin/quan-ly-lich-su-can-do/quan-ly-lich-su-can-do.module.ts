import { Module } from '@nestjs/common';
import { QuanLyLichSuCanDoService } from './quan-ly-lich-su-can-do.service';
import { QuanLyLichSuCanDoController } from './quan-ly-lich-su-can-do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyLichSuCanDoService],
  controllers: [QuanLyLichSuCanDoController]
})
export class QuanLyLichSuCanDoModule {}
