import { Module } from '@nestjs/common';
import { QuanLySanPhamService } from './quan-ly-san-pham.service';
import { QuanLySanPhamController } from './quan-ly-san-pham.controller';
import {Core} from './../../baseservice/core.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLySanPhamService],
  controllers: [QuanLySanPhamController]
})
export class QuanLySanPhamModule {}
