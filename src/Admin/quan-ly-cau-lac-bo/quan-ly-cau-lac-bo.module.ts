import { Module } from '@nestjs/common';
import { QuanLyCauLacBoService } from './quan-ly-cau-lac-bo.service';
import { QuanLyCauLacBoController } from './quan-ly-cau-lac-bo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [QuanLyCauLacBoService],
  controllers: [QuanLyCauLacBoController]
})
export class QuanLyCauLacBoModule {}
