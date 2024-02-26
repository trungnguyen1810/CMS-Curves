import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MenuModule } from './Admin/Menu/menu.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './filter/exception.filter';
import { LoggerModule } from './logger/logger.module';
import {NhanVienModule } from './Admin/nhan-vien/nhan-vien.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import { QuanLyKhachHangModule } from './Admin/quan-ly-khach-hang/quan-ly-khach-hang.module';
import { QuanLyTinTucModule } from './Admin/quan-ly-tin-tuc/quan-ly-tin-tuc.module';
import { QuanLyNhomQuyenModule } from './Admin/quan-ly-nhom-quyen/quan-ly-nhom-quyen.module';
import { ApiMobileModule } from './Api/api-mobile/api-mobile.module';
import { DanhMucSanPhamModule } from './Admin/danh-muc-san-pham/danh-muc-san-pham.module';
import { DanhMucDiaBanModule } from './Admin/danh-muc-dia-ban/danh-muc-dia-ban.module';
import { QuanLySanPhamModule } from './Admin/quan-ly-san-pham/quan-ly-san-pham.module';
import { QuanLySanPhamCLBModule } from './Admin/quan-ly-san-pham-clb/quan-ly-san-pham-clb.module';

import { QuanLyCauLacBoModule } from './Admin/quan-ly-cau-lac-bo/quan-ly-cau-lac-bo.module';
import { QuanLyBannerModule } from './Admin/quan-ly-banner/quan-ly-banner.module';
import { QuanLyNhuongQuyenModule } from './Admin/quan-ly-nhuong-quyen/quan-ly-nhuong-quyen.module';
import { CamNangDinhDuongModule } from './Admin/cam-nang-dinh-duong/cam-nang-dinh-duong.module';
import { QuanLyLichSuCanDoModule } from './Admin/quan-ly-lich-su-can-do/quan-ly-lich-su-can-do.module';
import { QuanLyMonAnModule } from './Admin/quan-ly-mon-an/quan-ly-mon-an.module';
import { QuanLyThongBaoModule } from './Admin/quan-ly-thong-bao/quan-ly-thongbao.module';
import { QuanLyDonHangModule } from './Admin/quan-ly-don-hang/quan-ly-donhang.module';
import { ThucDonThamKhaoModule } from './Admin/thuc-don-tham-khao/thuc-don-tham-khao.module';
import {QuanLyThuocTinhModule} from './Admin/quan-ly-thuoc-tinh-san-pham/quan-ly-thuoctinh.module';
// job tự động
import {JobTuDongModule} from './JobTuDong/jobtudong.module';
import { QuanLyLienHeModule } from './Admin/quan-ly-lien-he/quan-ly-lien-he.module';
import { CauHinhLienHeModule } from './Admin/cau-hinh-lien-he/cau-hinh-lien-he.module';
import { QuanLyDangKyNhuongQuyenModule } from './Admin/quan-ly-dang-ky-nhuong-quyen/quan-ly-dang-ky-nhuong-quyen.module';
import { LichSuLuyenTapModule } from './Admin/quan-ly-lich-su-luyen-tap/lich-su-luyen-tap.module';
// báo cáo
import {BaoCaoModule} from './Admin/bao-cao/baocao.module';
//entity
import {Core} from './baseservice/core.entity';
import {AppConfig} from './app.config';
import { QuanLyVoucherModule } from './Admin/quan-ly-voucher/quan-ly-voucher.module';
import { QuanLyKhachHangTiemNangModule } from './Admin/quan-ly-khach-hang-tiem-nang/quan-ly-khach-hang-tiem-nang.module';
import { QuanLyTuDoModule } from './Admin/quan-ly-tu-do/quan-ly-tu-do.module';
import { QuanLyPhieuThuModule } from './Admin/quan-ly-phieu-thu/quan-ly-phieu-thu.module';
import { BaoCaoQuanLyCanDoModule } from './Admin/bao-cao-quan-ly-can-do/bao-cao-quan-ly-can-do.module';
import { QuanLyNguonKhachHangModule } from './Admin/quan-ly-nguon-khach-hang/quan-ly-nguon-khach-hang.module';
import { BaoCaoQuanLyHoiVienModule } from './Admin/bao-cao-quan-ly-hoi-vien/bao-cao-quan-ly-hoi-vien.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','client/angular/dist/curves'),
      exclude: ['/api*']
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      serveRoot: '/upload',
    }),  
    TypeOrmModule.forRoot({
      type: "mysql",
    host: AppConfig.Host_mysql.toString(),
    port: 3306,
    username: AppConfig.User_mysql.toString(),
    password: AppConfig.Pass_mysql.toString(),
    database: AppConfig.DB_mysql.toString(),
	extra: {
          charset: "utf8mb4_unicode_ci"
      },
    synchronize: false,
    logging: true,
    entities:[Core]
    }),
    NhanVienModule,   
    LoggerModule,
    MenuModule,
    QuanLyKhachHangModule,
    QuanLyTinTucModule,
    QuanLyNhomQuyenModule,
    ApiMobileModule,
    DanhMucSanPhamModule,
    DanhMucDiaBanModule,
    QuanLySanPhamModule,
    QuanLySanPhamCLBModule,
    QuanLyCauLacBoModule,
    QuanLyBannerModule,
    QuanLyNhuongQuyenModule,
    CamNangDinhDuongModule,
    QuanLyLichSuCanDoModule,
    QuanLyMonAnModule,
    QuanLyThongBaoModule,
    QuanLyDonHangModule,
    QuanLyLienHeModule,
    ThucDonThamKhaoModule,
    CauHinhLienHeModule,
    QuanLyThuocTinhModule,
    QuanLyDangKyNhuongQuyenModule,
    LichSuLuyenTapModule,
    JobTuDongModule,
    BaoCaoModule,
    QuanLyVoucherModule,
    QuanLyKhachHangTiemNangModule,
    QuanLyTuDoModule,
    QuanLyPhieuThuModule,
    BaoCaoQuanLyCanDoModule,
    QuanLyNguonKhachHangModule,
    BaoCaoQuanLyHoiVienModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: AllExceptionFilter,
  }, ],
})

export class AppModule { }
