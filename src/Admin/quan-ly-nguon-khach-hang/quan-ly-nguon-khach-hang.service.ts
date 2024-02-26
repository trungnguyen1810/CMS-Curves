import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';


@Injectable()
export class QuanLyNguonKhachHangService extends CoreService {
    GetAll() {
        return this.QueryDB('Call NguonKhachHang_GetAll();');
      }
    Them_Sua(Id, TenNguonKhachHang, UserId) {
        return this.QueryDB(`Call NguonKhachHang_Add_Edit(${Id},'${TenNguonKhachHang}',${UserId});`);
      }

    Xoa(Id) {
        return this.QueryDB(`DELETE FROM nguonkhachhang WHERE Id = ${Id};`);
    }
}
