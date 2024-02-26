import { Injectable, Delete } from '@nestjs/common';
import {CoreService} from './../../baseservice/core.service';
@Injectable()
export class DanhMucSanPhamService extends CoreService {
    async GetAll(){
        return this.QueryDB('Call DanhMucSanPham_GetAll();')
    }
    async Delete(Id){        
        return this.QueryDB(`Call DanhMucSanPham_Delete(${Id});`)
    }
    async Add_Edit(Id,TenDanhMuc,TinhTrang,AnhDaiDien,UserId){
        return this.QueryDB(`Call DanhMucSanPham_Add_Edit(${Id},'${TenDanhMuc}',${TinhTrang},'${AnhDaiDien}',${UserId});`)
    }
}
