import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class QuanLyCauLacBoService extends CoreService {
  GetCLB() {
    return this.QueryDB('Call NamHK_QuanLyCauLacBo_TimKiem();');
  }
  Them_SuaCLB(Id, TenCLB, SoDienThoai, Email, TinhThanhId, DiaChi, TinhTrang, AnhDaiDien, SoDienThoaiZalo, Idmessenger, ThoiGianHoatDong, HoTen,DienThoai,EmailNd, TenDangNhap, MatKhau, UserId) {
    return this.QueryDB(`Call ThemMoi_UpDateCauLacBo(${Id},'${TenCLB}','${SoDienThoai}','${Email}',${TinhThanhId},'${DiaChi}',${TinhTrang},'${AnhDaiDien}','${SoDienThoaiZalo}','${Idmessenger}','${ThoiGianHoatDong}','${HoTen}','${DienThoai}','${EmailNd}','${TenDangNhap}','${MatKhau}',${UserId});`);
  }
  GetTinhThanh() {
    return this.QueryDB('Call GetTinhThanhCurves();')
  }

  XoaCLB(Id) {
    return this.QueryDB(`DELETE FROM caulacbo WHERE Id = ${Id};`);
  }
}
