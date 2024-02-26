import { Module } from '@nestjs/common';
import { QuanLyMonAnService } from './quan-ly-mon-an.service';
import { QuanLyMonAnController } from './quan-ly-mon-an.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyMonAnService],
  controllers: [QuanLyMonAnController]
})
export class QuanLyMonAnModule {}
