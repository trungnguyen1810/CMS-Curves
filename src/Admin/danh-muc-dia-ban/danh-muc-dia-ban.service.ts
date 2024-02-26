import { Injectable } from '@nestjs/common';
import {CoreService} from '../../baseservice/core.service';

@Injectable()
export class DanhMucDiaBanService extends CoreService{
    GetDiaBan(){
        return this.QueryDB('Call NamHK_DanhMucDiaBan_TimKiem();');
      }
      Them_SuaDiaBan(Id,TieuDe, TinhTrang,AnhDaiDien, UserId){
       return this.QueryDB(`Call NamHK_DanhMucDiaBan_ThemMoi_UpDate(${Id},'${TieuDe}',${TinhTrang},'${AnhDaiDien}',${UserId});`);
     }
 
     XoaDiaBan(Id){
       return this.QueryDB(`DELETE FROM diaban WHERE Id = ${Id};`);
     }
}
