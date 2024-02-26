import { Module } from '@nestjs/common';
import { ThucDonThamKhaoService } from './thuc-don-tham-khao.service';
import { ThucDonThamKhaoController } from './thuc-don-tham-khao.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [ThucDonThamKhaoService],
  controllers: [ThucDonThamKhaoController]
})
export class ThucDonThamKhaoModule {}
