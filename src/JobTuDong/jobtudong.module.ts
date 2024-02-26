import { Module } from '@nestjs/common';
import { JobNotification } from './jobnotification';
import { NotifiService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../baseservice/core.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  controllers: [JobNotification],
  providers: [NotifiService]
})
export class JobTuDongModule {}
