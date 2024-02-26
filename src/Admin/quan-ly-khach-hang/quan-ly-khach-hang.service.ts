import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class QuanLyKhachHangService extends CoreService {
    GetKH(UserId) {
        return this.QueryDB(`Call KhachHang_GetALL(${UserId});`);
    }

    GetKHCoGoiTap(UserId, CauLacBoId, GoiTapId, TinhTrang, TinhTrangTap) {
        return this.QueryDB(`Call KhachHang_CoGoiTap(${UserId},${CauLacBoId},${GoiTapId},${TinhTrang},${TinhTrangTap});`);
    }
    Them_SuaKH(Id, HoVaTen, SoDienThoai, Email, MatKhau, DiaChi, AnhDaiDien, AnhBia, TinhTrang, NgayBatDau, NgayKetThuc, CauLacBoId, GoiTapId, NgaySinh, SoThe, UserId,  ZaloFb, NgheNghiep,GhiChu,LienLacKhanCap, TieuSuSucKhoe, NguonKhachHang, Voucher, PhiGiaNhap, NgayDangKy,TienDatCoc,SoNgayTang, ThuThach, TieuSu, HinhThucThanhToan) {
    return this.QueryDB(`Call KhachHang_Them_Sua(${Id},'${HoVaTen}','${SoDienThoai}','${Email}','${MatKhau}','${DiaChi}','${AnhDaiDien}','${AnhBia}',${TinhTrang},'${NgayBatDau}','${NgayKetThuc}',${CauLacBoId}, ${GoiTapId},'${NgaySinh}','${SoThe}',${UserId},'${ZaloFb}','${NgheNghiep}','${GhiChu}','${LienLacKhanCap}','${TieuSuSucKhoe}',${NguonKhachHang}, '${Voucher}',${PhiGiaNhap}, '${NgayDangKy}',${TienDatCoc},${SoNgayTang},${ThuThach}, '${TieuSu}',${HinhThucThanhToan});`);
    }

    Them_SuaKHCoGoiTap(Id, HoVaTen, SoDienThoai, Email, MatKhau, DiaChi, AnhDaiDien, AnhBia, TinhTrang, NgayBatDau, NgayKetThuc, CauLacBoId, GoiTapId, NgaySinh, SoThe, UserId,  ZaloFb, NgheNghiep,GhiChu,LienLacKhanCap, TieuSuSucKhoe, NguonKhachHang, NgayDangKy, ThuThach, TieuSu, Voucher, PhiGiaNhap, TienDatCoc, SoNgayTang, HinhThucThanhToan) {
        return this.QueryDB(`Call KhachHang_Them_Sua_CoGoiTap(${Id},'${HoVaTen}','${SoDienThoai}','${Email}','${MatKhau}','${DiaChi}','${AnhDaiDien}','${AnhBia}',${TinhTrang},'${NgayBatDau}','${NgayKetThuc}',${CauLacBoId}, ${GoiTapId},'${NgaySinh}','${SoThe}',${UserId},'${ZaloFb}','${NgheNghiep}','${GhiChu}','${LienLacKhanCap}','${TieuSuSucKhoe}',${NguonKhachHang}, '${NgayDangKy}',${ThuThach}, '${TieuSu}', '${Voucher}',${PhiGiaNhap},${TienDatCoc},${SoNgayTang},${HinhThucThanhToan});`);
    }

    ChangePass(Id, MatKhau, UserId) {
        return this.QueryDB(`Call khachhang_changepassword(${Id},'${MatKhau}',${UserId});`);
    }

    XoaKH(Id) {
    return this.QueryDB(`DELETE FROM khachhang WHERE Id = ${Id};`);
    }


    GetCauLacBo(UserId) {
        return this.QueryDB(`Call GetCauLacBoTheoTinhThanh(${UserId});`)
    }
    GetCauLacBo_KhongPhanQuyen() {
        return this.QueryDB(`Call GetCauLacBo_KhongPhanQuyen();`)
    }

    DanhSachGoiTap() {
        return this.QueryDB('Call GetDanhSachGoiTap();')
    }

    API_KhachHang_import(HoTen, SoDienThoai, Email, SoThe, NgaySinh, DiaChi, MatKhau, MaCauLacBo, MaGoiTap, NgayBatDau, NgayKetThuc, UserId){
        return  this.QueryDB(`call API_KhachHang_import('${HoTen}', '${SoDienThoai}', '${Email}', '${SoThe}', '${NgaySinh}', '${DiaChi}', '${MatKhau}', '${MaCauLacBo}', '${MaGoiTap}', '${NgayBatDau}', '${NgayKetThuc}', ${UserId});`)
    }

    khachhang_tudo_insert(UserId,Id,TuNgay,DenNgay, GiaTien, TuDoId, KhachHangTuDoId, HinhThucThanhToan, NgayThueTu) {
        return this.QueryDB(`Call khachhang_tudo_insert(${UserId},${Id},'${TuNgay}','${DenNgay}', ${GiaTien}, ${TuDoId}, ${KhachHangTuDoId}, ${HinhThucThanhToan},'${NgayThueTu}');`);
    }
    khachhang_baoluu_inser(IdBaoLuu, Id, TuNgay, DenNgay, UserId) {
        return this.QueryDB(`Call khachhang_baoluu_inser(${IdBaoLuu},${Id},'${TuNgay}','${DenNgay}',${UserId});`);
    }

    khachang_chuyenphongtap_inser(Id, clbDen, soTien, UserId) {
        return this.QueryDB(`Call khachang_chuyenphongtap_inser(${Id},${clbDen},${soTien},${UserId});`);
    }

    loadngayketthuc(Id, NgayBatDau, SoNgayTang, Voucher) {
        return this.QueryDB(`Call loadngayketthuc(${Id},'${NgayBatDau}',${SoNgayTang},'${Voucher}');`);
    }

    HuyKhachHang_TaoVoucher(Id, NgayHetHan, SoLuongNgay, SoTien, LyDo, UserId){
        return  this.QueryDB(`call HuyKhachHang_TaoVoucher(${Id}, '${NgayHetHan}', ${SoLuongNgay},  ${SoTien}, '${LyDo}', ${UserId});`)
    }

    ChiTietHuyThanhVien(Id){
        return  this.QueryDB(`call ChiTietHuyThanhVien(${Id});`)
    }

    DanhSachThueTuDoTheoHoiVien(Id){
        return  this.QueryDB(`call DanhSachThueTuDoTheoHoiVien(${Id});`)
    }

    DanhSachGoiTapHoiVien(Id){
        return  this.QueryDB(`call DanhSachGoiTapHoiVien(${Id});`)
    }

    DanhSachTuDoTheoCLB(Id, TuNgay, DenNgay){
        return  this.QueryDB(`call DanhSachTuDoTheoCLB(${Id},'${TuNgay}','${DenNgay}');`)
    }
    DanhSachSanPhamDaMua(KhachHangId,UserId){
        return  this.QueryDB(`call DanhSachSanPhamDaMua(${KhachHangId},${UserId});`)
    }
    QuanLyHoiVien_GetSucKhoe(){
        return  this.QueryDB(`call QuanLyHoiVien_GetSucKhoe();`)
    }

    async khachhang_tudo_delete(UserId,KhachHangId,KhachHangTuDoId){
        return this.QueryDB(`Call khachhang_tudo_delete(${UserId},${KhachHangId},${KhachHangTuDoId});`)
    }

    async ThemMoiLichSuThanhToanGoiTap(Id,UserId,KhachHangId,KhachHangGoiTapId,MaVoucher,GiaTriVoucher,
        SoTienThanhToan,HinhThucThanhToan,NgayHenTra, NgayThanhToan){
        return this.QueryDB(`Call ThemMoiLichSuThanhToanGoiTap(${Id},${UserId},${KhachHangId},${KhachHangGoiTapId},'${MaVoucher}',${GiaTriVoucher},${SoTienThanhToan},${HinhThucThanhToan},'${NgayHenTra}', '${NgayThanhToan}');`)
    }
    
    DanhSachThanhToanTheoDot_KhachHang(Id, KhachHangGoiTapId){
        return  this.QueryDB(`call DanhSachThanhToanTheoDot_KhachHang(${Id},${KhachHangGoiTapId});`);
    }
    XoaThanhToanGoiTap(Id, KhachHangId) {
        return this.QueryDB(`call XoaThanhToanGoiTap(${Id},${KhachHangId});`)
    }
}
