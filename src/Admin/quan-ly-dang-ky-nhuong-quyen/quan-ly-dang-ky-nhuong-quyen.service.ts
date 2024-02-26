import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class QuanLyDangKyNhuongQuyenService extends CoreService {
    GetALL() {
        return this.QueryDB('Call DangKyNhuongQuyen_GetAll();');
      }
      XuLyDonHang(Id,UserId) {
        return this.QueryDB(`Call DangKyNhuongQuyen_XuLy(${Id},${UserId});`);
      }

      Xoa(Id){
        return this.QueryDB(`DELETE FROM lienhenhuongquyen WHERE Id = ${Id};`);
      }  
      BaoCao(TuNgay,DenNgay){
        return this.QueryDB(`Call BaoCaoLienHeNhuongQuyen('${TuNgay}','${DenNgay}');`);
    }
}
