import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenusService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Core} from './../../baseservice/core.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  controllers: [MenuController],
  providers: [MenusService],
})
export class MenuModule {}