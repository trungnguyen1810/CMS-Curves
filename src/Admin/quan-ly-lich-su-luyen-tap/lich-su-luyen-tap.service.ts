import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class LichSuLuyenTapService extends CoreService {
    GetALL(UserId,first,row,TenHoiVien,SoDienThoai,SoThe,ThangNam,NgayTap) {
        return this.QueryDB(`Call QuanLyLichSuLuyenTap_GetAll(${UserId},${first},${row},'${TenHoiVien}','${SoDienThoai}','${SoThe}','${ThangNam}','${NgayTap}');`);
    }
    GetListHoiVien(UserId) {
        return this.QueryDB(`Call QuanLyLichSuLuyenTap_GetListHoiVien(${UserId});`);
    }
    ThemMoiEdit(KhachHangId,NgayTap,UserId){
        return  this.QueryDB(`call QuanLyLichSuLuyenTap_ThemMoiEdit(${KhachHangId}, '${NgayTap}',${UserId});`)
    }
    
    
    Delete(Id,HoiVienId) {
        return this.QueryDB(`DELETE FROM lichsuluyentap WHERE Id = ${Id} and KhachHangId = ${HoiVienId};`);
    }
    ThongTinSoThe(UserId,MaThe){
        return  this.QueryDB(`call LichSuLuyenTap_QuetMaVach_TimKiem(${UserId}, '${MaThe}');`)
    }
    BaoCao(UserId,TuNgay,DenNgay) {
        return this.QueryDB(`Call QuanLyLichSuLuyenTap_GetAll_BaoCao(${UserId},'${TuNgay}','${DenNgay}');`);
    }
    
}
