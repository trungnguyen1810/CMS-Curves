import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class CamNangDinhDuongService extends CoreService {
    GetAll() {
        return this.QueryDB('Call CamNangDinhDuong_GetAll();');
      }
    Them_Sua(Id, TenCamNang, NoiDung, AnhDaiDien, TinhTrang, UserId) {
        return this.QueryDB(`Call CamNangDinhDuong_Add_Edit(${Id},'${TenCamNang}','${NoiDung}','${AnhDaiDien}',${TinhTrang},${UserId});`);
      }

    Xoa(Id) {
        return this.QueryDB(`DELETE FROM camnangdinhduong WHERE Id = ${Id};`);
    }
}
