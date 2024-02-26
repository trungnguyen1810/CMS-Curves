import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class QuanLyBannerService extends CoreService {
    GetALL() {
        return this.QueryDB('Call Banner_GetAll();');
      }
      Them_Sua(Id, DuongDanAnh, TinhTrang, ThuTuSapXep, UserId) {
        return this.QueryDB(`Call Banner_Them_Sua(${Id},'${DuongDanAnh}',${TinhTrang},${ThuTuSapXep},${UserId});`);
      }

      Xoa(Id){
        return this.QueryDB(`DELETE FROM banner WHERE Id = ${Id};`);
      }  
}
