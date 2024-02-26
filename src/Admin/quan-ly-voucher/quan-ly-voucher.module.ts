import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';
import { QuanLyVoucherService } from './quan-ly-voucher.service';
import { QuanLyVoucherController } from './quan-ly-voucher.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyVoucherService],
  controllers: [QuanLyVoucherController]
})
export class QuanLyVoucherModule {}
