import { Module } from '@nestjs/common';
import { DanhMucDiaBanService } from './danh-muc-dia-ban.service';
import { DanhMucDiaBanController } from './danh-muc-dia-ban.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [DanhMucDiaBanService],
  controllers: [DanhMucDiaBanController]
})
export class DanhMucDiaBanModule {}
