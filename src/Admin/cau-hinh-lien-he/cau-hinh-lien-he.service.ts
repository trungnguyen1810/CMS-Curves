import { Injectable } from '@nestjs/common';
import {CoreService} from '../../baseservice/core.service';

@Injectable()
export class CauHinhLienHeService  extends CoreService{
    GetCauHinh(){
        return this.QueryDB('Call CauHinhLienHe_GetALL();');
      }
      SuaCauHinh(SoDienThoai,SoDienThoaiZalo, Idmessenger,IdTiktok,IdZalo,IdFacebook, IdYoutube, UserId){
       return this.QueryDB(`Call Update_CauHinhLienHe('${SoDienThoai}','${SoDienThoaiZalo}','${Idmessenger}','${IdTiktok}','${IdZalo}','${IdFacebook}','${IdYoutube}',${UserId});`);
     }
}
