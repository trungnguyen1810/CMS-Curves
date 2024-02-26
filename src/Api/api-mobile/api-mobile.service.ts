import { Injectable } from '@nestjs/common';
import {CoreService} from './../../baseservice/core.service';
@Injectable()
export class ApiMobileService extends CoreService {
    async LoginApp(Email_SDT,MatKhau,Tokenfirebase,MaMay,HeDieuHanh){
        return await this.QueryDB(`call Api_Mobile_Login_App('${Email_SDT}','${MatKhau}','${Tokenfirebase}','${MaMay}','${HeDieuHanh}');`)
    }
    async ChangePassword(UserId,MatKhauCu,MatKhauMoi){
        return await this.QueryDB(`call Api_Mobile_ChangePassword(${UserId},'${MatKhauCu}','${MatKhauMoi}');`)
    }
    async DangKyHoiVien(PhoneEmail,MatKhau,Isphone){
        return await this.QueryDB(`call API_Mobile_DangKyHoiVien('${PhoneEmail}','${MatKhau}',${Isphone});`)
    }
    async QuenMatKhauDangNhap(Email,MatKhau){
        return await this.QueryDB(`call QuenMatKhau_Login('${Email}','${MatKhau}');`)
    }
    async QuenMatKhau(Email){
        return await this.QueryDB(`call QuenMatKhau_GetOTP('${Email}');`)
    }
    async KhoaTaiKhoan(UserId){
        return await this.QueryDB(`call API_Mobile_KhoaTaiKhoan(${UserId});`)
    }
    async XacNhanQuenMatKhau(Email, MaXacNhan){
        return await this.QueryDB(`call QuenMatKhau_XacNhanOTP('${Email}', '${MaXacNhan}');`)
    }
    async ChangePasswordQMK(UserId,MatKhauMoi){
        return await this.QueryDB(`call Api_Mobile_ChangePassword_QMK(${UserId},'${MatKhauMoi}');`)
    }
    async ThongTinKhachHang(Id){
        return await this.QueryDB(`call ThongTinTaiKhoanKhachHang_GetTT(${Id});`)
    }
    async ChangeAnh(Id,ViTri,DuongDanAnh){
        return await this.QueryDB(`call KhachHang_Anh(${Id},${ViTri},'${DuongDanAnh}');`)
    }

    async ChangeThongTin(Id,HoVaTen,SoDienThoai, Email, DiaChi){
        return await this.QueryDB(`call KhachHang_Update(${Id},'${HoVaTen}','${SoDienThoai}','${Email}','${DiaChi}');`)
    }
    async API_Mobile_LienHe_CauHinh(){
        return await this.QueryDB(`Call API_Mobile_LienHe_CauHinh();`);
    }
    async GetListDanhMucSanPham(PageSize,PageIndex){
        return await this.QueryDB(`Call API_Mobile_DanhMucSanPham_GetAll(${PageSize},${PageIndex});`);
    }
    async GetListProductByCategory(DanhMucSanPhamId){
        return await this.QueryDB(`Call API_Mobile_DanhSachSanPhamTheoDanhMuc(${DanhMucSanPhamId});`);
    }
    async DatHang(SanPhamId,TenKhachHang,SDT,DiaChi,GhiChu,option,SoLuong,CauLacBoId){
        return await this.QueryDB(`Call API_Mobile_TaoDonHang(${SanPhamId},'${TenKhachHang}','${SDT}','${DiaChi}','${GhiChu}','${option}',${SoLuong},${CauLacBoId});`);
    }
    async ChiTietSanPham(SanPhamId){
        return await this.QueryDB(`Call API_Mobile_GetChiTietSanPham(${SanPhamId});`);
    }
    async GetDanhSachThucDonThamKhao(Ngay,KhachHangId){
        return await this.QueryDB(`Call API_Mobile_Curves_GetDanhSachThucDonThamKhao('${Ngay}',${KhachHangId});`);
    }
    async ApDungThucDonThamKhao(UserId,Ngay){
        return await this.QueryDB(`Call API_Mobile_Curves_ApDungThucDonThamKhao(${UserId},'${Ngay}');`);
    }
    async GetDanhSachThucDonTheoNgay(Ngay,KhachHangId){
        return await this.QueryDB(`Call API_Mobile_Curves_GetDanhSachMonAnHoiVienTheoNgayVaGiaiDoan('${Ngay}',${KhachHangId});`);
    }
    async ThemMoiMonAnHoiVien(UserId,Ngay,BuaAnId,MonAnId,SoLuong){
        return await this.QueryDB(`Call API_Mobile_Curves_ThemMoiMonAn(${UserId},'${Ngay}',${BuaAnId},${MonAnId},'${SoLuong}');`);

    }
    async EditMonAnHoiVien(UserId,Id,MonAnId,SoLuong){
        return await this.QueryDB(`Call API_Mobile_Curves_EditMonAn(${UserId},${Id},'${MonAnId}','${SoLuong}');`);
    }
    async EditMonAnHoiVien_TaoMoi(UserId,Id,TenMonAn,DonViTinhId,Calo,SoLuong){
        return await this.QueryDB(`Call API_Mobile_Curves_EditMonAn_TaoMoi(${UserId},${Id},'${TenMonAn}',${DonViTinhId},'${Calo}','${SoLuong}');`);
    }
    async DatNhacNhoMonAn(UserId, Ngay,BuaId, DatNhacNho, ThoiGianNhacNho){
        return await this.QueryDB(`Call API_Mobile_Curves_DatNhacNho(${UserId},'${Ngay}',${BuaId},${DatNhacNho},'${ThoiGianNhacNho}');`);

    }   
  
    async GetDanhSachThongBao(UserId,PageSize,PageIndex){
        return await this.QueryDB(`Call API_Mobile_GetDanhSachThongBao(${UserId},${PageSize},${PageIndex});`);
    }
    async CapNhatTinhTrangDoc(UserId,ThongBaoId){
        return await this.QueryDB(`Call API_Mobile_ThongBao_CapNhatTinhTrangDoc(${UserId},${ThongBaoId});`);
    }
    async ChiTietThongBao(UserId,ThongBaoId){
        return await this.QueryDB(`Call API_Mobile_ThongBao_ChiTiet(${UserId},${ThongBaoId});`);
    }
    
    
    async GetLichSuLuyenTap(NamThang,UserId){
        return await this.QueryDB(`Call API_Mobile_GetLichSuLuyenTap('${NamThang}',${UserId});`);
    }
    async ThemLichSuLuyenTap(NgayLuyenTap,UserId){
        return await this.QueryDB(`Call API_Mobile_LichSuLuyenTap_ThemMoi('${NgayLuyenTap}',${UserId});`);
    }
    async GetCurvesComplete(){
        return await this.QueryDB(`Call API_Mobile_GetCurvesComplete();`);
    }
    async API_Mobile_GetDanhSachCurvesComplete(){
        return await this.QueryDB(`Call API_Mobile_GetDanhSachCurvesComplete();`);
    }
    async Api_Mobile_ChiTietCurvesComplete(Id){
        return await this.QueryDB(`Call Api_Mobile_ChiTietCurvesComplete(${Id});`);
    }
    async TickMonAn(UserId,Ngay,MonAnId,SoLuong,TinhTrang,BuaId){
        return await this.QueryDB(`Call API_Mobile_TickMonAn(${UserId},'${Ngay}',${MonAnId},${SoLuong},${TinhTrang},${BuaId});`);
    }
    async GetDanhSachMonAn(){
        return await this.QueryDB(`Call API_Mobile_GetDanhSachMonAn();`);
    }
    async GetDanhSachDonViTinh(){
        return await this.QueryDB(`Call API_Mobile_GetDanhSachDonViTinh();`);
    }
    async XoaMonAn(UserId,Id){
        return await this.QueryDB(`Call API_Mobile_XoaMonAn(${UserId},${Id});`);
    }
    async ThemMoiMonAn_NhapTay(KhachHangId,TenMonAn,DonViTinhId,Calo,SoLuong,Ngay,BuaId){
        return await this.QueryDB(`Call API_Mobile_ThemMonAn_NhapTay(${KhachHangId},'${TenMonAn}',${DonViTinhId},'${Calo}','${SoLuong}','${Ngay}',${BuaId})`);
    }
    
    async GetDanhSachTenBuaAnTheoNgay(Ngay,UserId){
        return await this.QueryDB(`Call API_Mobile_Curves_GetDanhSachBuaAnTheoNgay('${Ngay}',${UserId});`);
    }
    async ThemBuaAnHoiVien(Ngay,TenBuaAn,UserId){
        return await this.QueryDB(`Call API_Mobile_Curves_ThemMoiTenBuaAn('${Ngay}','${TenBuaAn}',${UserId});`);
    }
    async EditBuaAnHoiVien(BuaId,TenBuaAn,UserId,DatNhacNho,ThoiGianNhacNho){
        return await this.QueryDB(`Call API_Mobile_Curves_EditTenBuaAn(${BuaId},'${TenBuaAn}',${UserId},${DatNhacNho},'${ThoiGianNhacNho}');`);
    }
    async XoaBuaAnHoiVien(BuaId,UserId){
        return await this.QueryDB(`Call API_Mobile_Curves_XoaBuaAn(${BuaId},${UserId});`);
    }
    
}

