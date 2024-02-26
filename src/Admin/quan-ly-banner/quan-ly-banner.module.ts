import { Module } from '@nestjs/common';
import { QuanLyBannerService } from './quan-ly-banner.service';
import { QuanLyBannerController } from './quan-ly-banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyBannerService],
  controllers: [QuanLyBannerController]
})
export class QuanLyBannerModule {}
