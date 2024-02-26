import { Module } from '@nestjs/common';
import { BaoCaoService } from './baocao.service';
import { BaoCaoController } from './baocao.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [BaoCaoService],
  controllers: [BaoCaoController]
})
export class BaoCaoModule {}
