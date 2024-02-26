import { Module } from '@nestjs/common';
import { DanhMucSanPhamController } from './danh-muc-san-pham.controller';
import { DanhMucSanPhamService } from './danh-muc-san-pham.service';
import {Core} from './../../baseservice/core.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  controllers: [DanhMucSanPhamController],
  providers: [DanhMucSanPhamService]
})
export class DanhMucSanPhamModule {}
