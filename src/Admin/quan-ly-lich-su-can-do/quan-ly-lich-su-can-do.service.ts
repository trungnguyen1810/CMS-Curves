import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class QuanLyLichSuCanDoService extends CoreService {

    GetALL(UserId) {
        return this.QueryDB(`Call LichSuCanDo_GetALL(${UserId});`);
    }

    API_Mobile_ThemChiSoCoThe_import(SoDienThoai, Ngay, CanNang, ChieuCao, LuongMoCoThe, MatDoCo, MatDoXuong, BMI, DCI, TuoiSinhHoc, LuongNuocCoThe, MoNoiTang, Nguc, Eo, Bung, Mong, Dui, Tay, UserId){
        return  this.QueryDB(`call API_Mobile_ThemChiSoCoThe_import('${SoDienThoai}', '${Ngay}', '${CanNang}', '${ChieuCao}', '${LuongMoCoThe}', '${MatDoCo}', '${MatDoXuong}', '${BMI}', '${DCI}', '${TuoiSinhHoc}', '${LuongNuocCoThe}', '${MoNoiTang}', '${Nguc}', '${Eo}', '${Bung}', '${Mong}', '${Dui}', '${Tay}', ${UserId});`)
    }

    ThemChiSoCoThe_themmoi(Id, SoDienThoai, CanNang, ChieuCao, LuongMoCoThe, MatDoCo, MatDoXuong, BMI, DCI, TuoiSinhHoc, LuongNuocCoThe, MoNoiTang, Nguc, Eo, Bung, Mong, Dui, Tay, NgayCanDo, UserId){
        return  this.QueryDB(`call ThemChiSoCoThe_themmoi(${Id},'${SoDienThoai}', '${CanNang}', '${ChieuCao}', '${LuongMoCoThe}', '${MatDoCo}', '${MatDoXuong}', '${BMI}', '${DCI}', '${TuoiSinhHoc}', '${LuongNuocCoThe}', '${MoNoiTang}', '${Nguc}', '${Eo}', '${Bung}', '${Mong}', '${Dui}', '${Tay}', '${NgayCanDo}', ${UserId});`)
    }

    XemChiTiet(Id){
        return  this.QueryDB(`call lichsucando_chitiet(${Id});`)
    }
    
    XoaLS(Id) {
        return this.QueryDB(`DELETE FROM lichsucando WHERE Id = ${Id};`);
        }
}
