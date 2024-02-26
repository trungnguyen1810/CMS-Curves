import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class BaoCaoService extends CoreService {
    KhachHangDangTap(userid) {
        return this.QueryDB(`Call BaoCao_DanhSachKhachHangDangTap(${userid});`);
    }
    KhachHangChuaCoGoiTap(userid){
        return this.QueryDB(`Call BaoCaoDanhSachKhachHangChuaCoGoiTap(${userid});`);
    }
    KhachHangHetHan(userid,TuNgay,DenNgay){
        return this.QueryDB(`Call BaoCaoDanhSachKhachHangHetHan_TuNgay_DenNgay(${userid},'${TuNgay}','${DenNgay}');`);
    }
    KhachHangMoiDangKyGoiTap(userid,TuNgay,DenNgay){
        return this.QueryDB(`Call BaoCao_DanhSachKhachHang_MoiDangKyGoiTap(${userid},'${TuNgay}','${DenNgay}');`);
    }
    KhachHangCoLichCanDo(userid,TuNgay,DenNgay){
        return this.QueryDB(`Call BaoCaoDanhSachKhachHangCoLichCanDo_TuNgay_DenNgay(${userid},'${TuNgay}','${DenNgay}');`);
    }
    KhachHangTreHenCanDo(userid){
        return this.QueryDB(`Call BaoCaoDanhSachKhachHangTreHenCanDo(${userid});`);
    }
}
