import { Module } from '@nestjs/common';
import { CauHinhLienHeService } from './cau-hinh-lien-he.service';
import { CauHinhLienHeController } from './cau-hinh-lien-he.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [CauHinhLienHeService],
  controllers: [CauHinhLienHeController]
})
export class CauHinhLienHeModule {}
