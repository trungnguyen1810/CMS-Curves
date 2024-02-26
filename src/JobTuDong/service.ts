import { Injectable } from '@nestjs/common';
import { CoreService } from '../baseservice/core.service';

@Injectable()
export class NotifiService extends CoreService {
    GetDanhSachNhacNho() {
        return this.QueryDB('Call JobTuDong_GetLichNhacNho();');
    }
    GetDanhSachHetHanGoiTap(){
        return this.QueryDB('Call JobTuDong_GetHetHanGoiTap();');
    }
}
