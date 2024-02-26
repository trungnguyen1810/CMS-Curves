import { Module } from '@nestjs/common';
import { QuanLyTinTucService } from './quan-ly-tin-tuc.service';
import { QuanLyTinTucController } from './quan-ly-tin-tuc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TinTuc } from './tintuc.entity';
import {Core} from './../../baseservice/core.entity';
@Module({
    imports:[TypeOrmModule.forFeature([Core])],
    providers: [QuanLyTinTucService],
    controllers: [QuanLyTinTucController]
})
export class QuanLyTinTucModule {}
