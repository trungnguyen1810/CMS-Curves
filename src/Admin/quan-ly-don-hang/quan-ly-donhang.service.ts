import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';
import {AppConfig} from './../../app.config';
@Injectable()
export class QuanLyDonHangService extends CoreService {
      GetALL(userid) {
        return this.QueryDB(`Call QuanLyDonHang_GetAll(${userid});`);
      }
      XuLyDonHang(Id,UserId) {
        return this.QueryDB(`Call QuanLyDonHang_XuLyDonHang(${Id},${UserId});`);
      }

      Xoa(Id){
        return this.QueryDB(`DELETE FROM donhang WHERE Id = ${Id};`);
      }  
     
}
