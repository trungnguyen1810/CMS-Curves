import { Module } from '@nestjs/common';
import { QuanLySanPhamCLBService } from './quan-ly-san-pham-clb.service';
import { QuanLySanPhamCLBController } from './quan-ly-san-pham-clb.controller';
import {Core} from './../../baseservice/core.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLySanPhamCLBService],
  controllers: [QuanLySanPhamCLBController]
})
export class QuanLySanPhamCLBModule {}
