import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class QuanLyLienHeService extends CoreService {
    GetALL() {
        return this.QueryDB('Call LienHeDangKyGoiTap_GetAll();');
      }
      XuLyDonHang(Id,UserId) {
        return this.QueryDB(`Call LienHeDangKyGoiTap_XuLyLienHe(${Id},${UserId});`);
      }

      Xoa(Id){
        return this.QueryDB(`DELETE FROM lienhendangkygoitap WHERE Id = ${Id};`);
      }  

      BaoCao(TuNgay,DenNgay){
        return this.QueryDB(`Call BaoCaoLienHeDangKyGoiTap('${TuNgay}','${DenNgay}');`);
    }
}
