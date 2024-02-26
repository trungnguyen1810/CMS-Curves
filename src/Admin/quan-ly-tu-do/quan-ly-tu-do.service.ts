import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';
import {AppConfig} from './../../app.config';
@Injectable()
export class QuanLyTuDoService extends CoreService {
    GetALL(UserId) {
        return this.QueryDB(`Call QuanLyTuDo_GetAll(${UserId});`);
      }
      Add_Edit(Id, TenCauHinh, UserId, GiaThueTheoNgay, TuNgay,DenNgay ) {
        return this.QueryDB(`Call QuanLyTuDo_Add_Edit(${Id},'${TenCauHinh}',${UserId},${GiaThueTheoNgay},'${TuNgay}','${DenNgay}');`);
      }
    //   async GetCauLacBo() {
    //     return await this.QueryDB('CALL QuanLyTuDo_GetAllCauLacBo();')
    // }
      Xoa(Id){
        return this.QueryDB(`DELETE FROM cauhinhtudo WHERE Id = ${Id};`);
      }  
}
