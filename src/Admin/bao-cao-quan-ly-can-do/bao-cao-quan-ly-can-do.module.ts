import { Module } from '@nestjs/common';
import { BaoCaoQuanLyCanDoService } from './bao-cao-quan-ly-can-do.service';
import { BaoCaoQuanLyCanDoController } from './bao-cao-quan-ly-can-do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [BaoCaoQuanLyCanDoService],
  controllers: [BaoCaoQuanLyCanDoController]
})
export class BaoCaoQuanLyCanDoModule {}
