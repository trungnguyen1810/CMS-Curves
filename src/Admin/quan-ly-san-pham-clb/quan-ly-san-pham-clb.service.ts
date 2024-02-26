import { Injectable } from '@nestjs/common';
import {CoreService} from '../../baseservice/core.service';
@Injectable()
export class QuanLySanPhamCLBService extends CoreService {

    async GetAll(userId){
        return this.QueryDB(`Call QuanLySanPham_GetAll_clb(${userId});`)
    }
    async getChiTiet(Id){
        return this.QueryDB(`Call QuanLySanPham_GetChiTiet_clb(${Id});`)
    }
    async Add_Edit(Id,TenSanPham,DanhMucSanPhamId,AnhDaiDien,AnhChiTiet,Gia,HienThi,UserId,MoTa,Color,Size,ChatLieu,ConHang){
        return this.QueryDB(`Call QuanLySanPham_Add_Edit_clb(${Id},'${TenSanPham}',${DanhMucSanPhamId},'${AnhDaiDien}',
        '${AnhChiTiet}',${Gia},${HienThi},${UserId},'${MoTa}','${Color}','${Size}','${ChatLieu}',${ConHang});`)
    }
    async Add_Edit_ThongSoKyThuat(Id, ThongSoKyThuatId) {
        let list = [];
        for (let i = 0; i < ThongSoKyThuatId.length; i++) {
            let ThuocTinhId = ThongSoKyThuatId[i].Id;
            list.push(ThuocTinhId);           
        }
        return this.QueryDB(`CALL QuanLySanPham_Add_Edit_ThongSoKyThuat_clb(${Id},'${list.toString()}');`);
    }
    async Edit_AnhChiTiet(Id, AnhChiTiet,STT) {
        
        return this.QueryDB(`CALL QuanLySanPham_Add_Edit_Edit_AnhChiTiet_clb(${Id},'${AnhChiTiet}',${STT});`);
    }
    async XoaSanPham(Id){
        return this.QueryDB(`delete from sanpham_clb where Id = ${Id};`);
    }

    async Add_SoLuong(Id,SoLuongThem, SoLuongBot, UserId){
        return this.QueryDB(`Call QuanLySanPham_Add_SoLuong_clb(${Id},${SoLuongThem},${SoLuongBot},${UserId});`)
    }

    async nhanvien_check_admin(UserId){
        return this.QueryDB(`Call nhanvien_check_admin(${UserId});`)
    }
    async v2_QuanLyTonKho_ChonSanPham(){
        return this.QueryDB(`Call v2_QuanLyTonKho_ChonSanPham();`)
    }
    async v2_QuanLyTonKho_GetALL(userid){
        return this.QueryDB(`Call v2_QuanLyTonKho_GetALL(${userid});`)
    }
    async v2_DanhSachSanPhamCLB(userid){
        return this.QueryDB(`Call v2_DanhSachSanPhamCLB(${userid});`)
    }
    async v2_DanhSachDonHangSanPhamKhachHang(userid,khachhangid){
        return this.QueryDB(`Call v2_DanhSachDonHangSanPhamKhachHang(${userid},${khachhangid});`)
    }
    async v2_CapNhatThemMoiDonHangSanPhamKhachHang(UserId,KhachHangId,DonHangId,MaVoucher,GiaTriVoucher,
        SoTienThanhToan,HinhThucThanhToan,TongTien,SoTienConNo,NgayThanhToan){
        return this.QueryDB(`Call v2_CapNhatThemMoiDonHangSanPhamKhachHang(${UserId},${KhachHangId},${DonHangId},'${MaVoucher}',${GiaTriVoucher},${SoTienThanhToan},${HinhThucThanhToan},${TongTien},${SoTienConNo},'${NgayThanhToan}');`)
    }
    async v2_ThemMoiSanPhamVaoDonHangKhachHang(UserId,KhachHangId,donhangid,SanPhamId,GiaSanPham,SoLuong,NgayThanhToan){
        return this.QueryDB(`Call v2_ThemMoiSanPhamVaoDonHangKhachHang(${UserId},${KhachHangId},${donhangid},${SanPhamId},${GiaSanPham},${SoLuong},'${NgayThanhToan}');`)
    }
    async v2_XoaDonHangSanPhamKhachHang(UserId,KhachHangId,donhangid){
        return this.QueryDB(`Call v2_XoaDonHangSanPhamKhachHang(${UserId},${KhachHangId},${donhangid});`)
    }
    async v2_KiemTraMaVoucher(UserId,KhachHangId,mavoucher){
        return this.QueryDB(`Call v2_KiemTraMaVoucher(${UserId},${KhachHangId},'${mavoucher}');`)
    }
    async v2_ChiTietDonHang(UserId,DonHangId){
        return this.QueryDB(`Call v2_ChiTietDonHang(${UserId},${DonHangId});`)
    }
    
    async v2_KiemTraMaVoucherSanPham(UserId,KhachHangId,mavoucher){
        return this.QueryDB(`Call v2_KiemTraMaVoucherSanPham(${UserId},${KhachHangId},'${mavoucher}');`)
    }
}
