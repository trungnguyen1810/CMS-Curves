import { Module } from '@nestjs/common';
import { QuanLyLienHeService } from './quan-ly-lien-he.service';
import { QuanLyLienHeController } from './quan-ly-lien-he.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Core])],
    providers: [QuanLyLienHeService],
    controllers: [QuanLyLienHeController]
})
export class QuanLyLienHeModule {}
