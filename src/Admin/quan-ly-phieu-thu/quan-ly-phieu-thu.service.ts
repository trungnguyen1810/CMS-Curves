import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';
import {AppConfig} from './../../app.config';
@Injectable()
export class QuanLyPhieuThuService extends CoreService {
    GetALL() {
        return this.QueryDB('Call QuanLyTuDo_GetAll();');
      }
      Add_Edit(Id, TenCauHinh, CauLacBoId, GiaThueTheoNgay, TuNgay,DenNgay ) {
        return this.QueryDB(`Call QuanLyTuDo_Add_Edit(${Id},'${TenCauHinh}',${CauLacBoId},${GiaThueTheoNgay},'${TuNgay}','${DenNgay}');`);
      }
      async GetAllKhachHang(UserId) {
        return await this.QueryDB(`CALL QuanLyPhieuThu_KhachHang_GetAll(${UserId});`)
      }
      Xoa(Id){
        return this.QueryDB(`DELETE FROM cauhinhtudo WHERE Id = ${Id};`);
      }  
      GetGoiTap(UserId){
        return this.QueryDB(`CALL QuanLyPhieuThu_GetGoiTap(${UserId});`);
      }
}
