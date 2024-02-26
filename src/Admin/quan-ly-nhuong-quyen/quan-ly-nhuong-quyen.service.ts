import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class QuanLyNhuongQuyenService extends CoreService{

    GetALL() {
        return this.QueryDB('Call ThongTinNhuongQuyen_GetAll();');
      }
      Them_Sua(Id, MaNhuongQuyen, TenNhuongQuyen, AnhDaiDien, NoiDung, TinhTrang, TyLe, GiaTien, SoLuong, DonVi, UserId) {
        return this.QueryDB(`Call NhuongQuyen_Add_Edit(${Id},'${MaNhuongQuyen}','${TenNhuongQuyen}','${AnhDaiDien}','${NoiDung}',${TinhTrang},'${TyLe}','${GiaTien}',${SoLuong},${DonVi},${UserId});`);
      }

      Xoa(Id){
        return this.QueryDB(`DELETE FROM nhuongquyen WHERE Id = ${Id};`);
      }  
}
