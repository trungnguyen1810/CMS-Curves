
import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class BaoCaoQuanLyHoiVienService extends CoreService {
    DanhSachHoiVienTangGiamCan(tungay,denngay,caulacboid) {
        return this.QueryDB(`Call BaoCao9_DanhSachHoiVienTangGiamCan('${tungay}','${denngay}','${caulacboid}');`);
    }
    DanhSachHoiVienTreHen(userid,caulacboid){
        return this.QueryDB(`Call BaoCaoDanhSachKhachHangTreHenCanDo(${userid},'${caulacboid}');`);

    }
    DanhSachHoiVienCoLichCanDo(userid,caulacboid,tungay,denngay){
        return this.QueryDB(`Call BaoCaoDanhSachKhachHangCoLichCanDo(${userid},'${caulacboid}','${tungay}','${denngay}');`);

    }
    DanhSachCauLacBo(userid){
        return this.QueryDB(`Call BaoCao_GetDanhSachCauLacBo(${userid});`);

    }

    BaoCao_DanhSachKhachHangDangBaoLuu(userid) {
        return this.QueryDB(`Call BaoCao_DanhSachKhachHangDangBaoLuu(${userid});`);
    }

    BaoCao_DanhSachKhachHangHuy(userid) {
        return this.QueryDB(`Call BaoCao_DanhSachKhachHangHuy(${userid});`);
    }

    BaoCao_DanhSachKhachHangHuy_KhoangTIME(userid,tungay,denngay){
        return this.QueryDB(`Call BaoCao_DanhSachKhachHangHuy_KhoangTIME(${userid},'${tungay}','${denngay}');`);

    }

    BaoCao_DanhSachKhachHangChuyenCLB_KhoangTIME(userid,tungay,denngay){
        return this.QueryDB(`Call BaoCao_DanhSachKhachHangChuyenCLB_KhoangTIME(${userid},'${tungay}','${denngay}');`);

    }

    BaoCao_DanhSachKhachHangHetHan(userid) {
        return this.QueryDB(`Call BaoCao_DanhSachKhachHangHetHan(${userid});`);
    }

    BaoCao_DanhSachHoiVienCoSinhNhat_KhoangTIME(userid,tungay,denngay){
        return this.QueryDB(`Call BaoCao_DanhSachHoiVienCoSinhNhat_KhoangTIME(${userid},'${tungay}','${denngay}');`);

    }

    
    BaoCao_DanhSachHoiVienSapHetHan_KhoangTime(userid,tungay,denngay){
        return this.QueryDB(`Call BaoCao_DanhSachHoiVienSapHetHan_KhoangTime(${userid},'${tungay}','${denngay}');`);

    }

    DanhSachVoucher_DaSuDung_KhoangTime(userid, tungay,denngay){
        return this.QueryDB(`Call DanhSachVoucher_DaSuDung_KhoangTime(${userid},'${tungay}','${denngay}');`);

    }

    DanhSachThueTuDo(userid) {
        return this.QueryDB(`Call DanhSachThueTuDo(${userid});`);
    }
    BaoCaoDanhSachThueTuDo_TheoKhoangTime(userid,tungay,denngay){
        return this.QueryDB(`Call BaoCaoDanhSachThueTuDo_TheoKhoangTime(${userid},'${tungay}','${denngay}');`);

    }

    BaoCao_DanhSachKhachHangDangBaoLuu_TuNgay_DenNgay(userid,tungay,denngay){
        return this.QueryDB(`Call BaoCao_DanhSachKhachHangDangBaoLuu_TuNgay_DenNgay(${userid},'${tungay}','${denngay}');`);

    }

    
    BaoCaoDanhSachHoiVien_HenTra(userid,tungay,denngay){
        return this.QueryDB(`Call BaoCaoDanhSachHoiVien_HenTra(${userid},'${tungay}','${denngay}');`);

    }
    BaoCaoKhachHangTreHenTraNo_GoiTap(userid){
        return this.QueryDB(`Call BaoCaoKhachHangTreHenTraNo_GoiTap(${userid});`);

    }
    BaoCaoKhachHangTiemNang(){
        return this.QueryDB(`Call BaoCaoKhachHangTiemNang();`);

    }

    BaoCaoDanhSachHoiVienThamGiaTapLuyen(userid,tungay,denngay){
        return this.QueryDB(`Call BaoCaoDanhSachHoiVienThamGiaTapLuyen(${userid},'${tungay}','${denngay}');`);
    }
    
    BaoCaoDanhSachHoiVienConHanKhongTap(userid,tungay,denngay){
        return this.QueryDB(`Call BaoCaoDanhSachHoiVienConHanKhongTap(${userid},'${tungay}','${denngay}');`);
    }
    BaoCaoKhachHangChuaVaCoGoiTap(userid){
        return this.QueryDB(`Call BaoCaoKhachHangChuaVaCoGoiTap(${userid});`);

    }
}

