import { Module } from '@nestjs/common';
import { ApiMobileService } from './api-mobile.service';
import {ApiTinTucController} from './api-tintuc.controller';
import {ApiTintucService} from './api-tintuc.service';
import {ApiSanPhamController} from './api-sanpham.controller';
import {ApiCauLacBoController} from './api-caulacbo.controller';
import {ApiBannerController} from './api-banner.controller';
import {ApiNhuongQuyenController} from './api-nhuongquyen.controller';
import {ApiCamNangDinhDuongController} from './api-camnangdinhduong.controller';
import {ApiLichSuCanDoController} from './api-lichsucando.controller';
import {ApiSocialController} from './api-social.controller';
import {ApiCurvesController} from './api-curves.controller';
import { ApiMobileController } from './api-mobile.controller';
import {ApiChatController} from './api-chat.controller';
import {ApiSocialService} from './api-social.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import{Core} from './../../baseservice/core.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Core])],
  providers: [ApiMobileService,ApiTintucService,ApiSocialService],
  controllers: [ApiMobileController,ApiTinTucController,ApiSanPhamController,ApiCauLacBoController, 
    ApiBannerController, ApiNhuongQuyenController, ApiCamNangDinhDuongController, ApiLichSuCanDoController,
    ApiSocialController,ApiCurvesController,ApiChatController]
})

export class ApiMobileModule {}
