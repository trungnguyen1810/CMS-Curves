import { Module } from '@nestjs/common';
import { QuanLyTuDoService } from './quan-ly-tu-do.service';
import { QuanLyTuDoController } from './quan-ly-tu-do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyTuDoService],
  controllers: [QuanLyTuDoController]
})
export class QuanLyTuDoModule {}
