import { Injectable } from '@nestjs/common';
import {CoreService} from './../../baseservice/core.service';
@Injectable()
export class ApiTintucService extends CoreService {
    async GetTinTuc(LoaiTinTucId){
        return await this.QueryDB(`call NamHK_DanhSachTinTucTheoLoai('${LoaiTinTucId}');`)
    }

    async GetChiTietTinTuc(TinTucId){
        return await this.QueryDB(`call NamHK_ChiTietTinTucKhuyenMai('${TinTucId}');`)
    }

    async TinTucKhuyenMaiLienQuan(TinTucId){
        return await this.QueryDB(`call NamHK_TinTucLienQuan('${TinTucId}');`)
    }

    async TinTucKhuyenMaiTrangChu(){
        return await this.QueryDB(`call NamHK_TinTucKhuyenMai_TrangChu();`)
    }

    // Câu lạc bộ
    async API_Mobile_DanhSachCauLacBo(){
        return await this.QueryDB(`call API_Mobile_DanhSachCauLacBo();`)
    }
    async API_Mobile_CauLacBo_TimKiem(NoiDung){
        return await this.QueryDB(`call API_Mobile_CauLacBo_TimKiem('${NoiDung}');`)
    }
    async API_Mobile_DanhSachCLBTheoTinhThanh(TinhThanhId){
        return await this.QueryDB(`call API_Mobile_DanhSachCLBTheoTinhThanh(${TinhThanhId});`)
    }
    async API_Mobile_CauLacBo_ChiTiet(Id){
        return await this.QueryDB(`call API_Mobile_CauLacBo_ChiTiet(${Id});`)
    }
    async API_Mobile_CauLacBo_DSQuanTam(Id){
        return await this.QueryDB(`call API_Mobile_CauLacBo_DSQuanTam(${Id});`)
    }

    // banner

    async API_Mobile_DanhSachBanner(){
        return await this.QueryDB(`call API_Mobile_DanhSachBanner();`)
    }
    
    // nhượng quyền

    async API_Mobile_NhuongQuyen_TrangChu(Ma){
        return await this.QueryDB(`call API_Mobile_NhuongQuyen_TrangChu('${Ma}');`)
    }

    async API_Mobile_DanhSachNhuongQuyen(){
        return await this.QueryDB(`call API_Mobile_DanhSachNhuongQuyen();`)
    }

    async API_Mobile_NhuongQuyen_ChiTiet(Id){
        return await this.QueryDB(`call API_Mobile_NhuongQuyen_ChiTiet(${Id});`)
    }

    async API_Mobile_AnhGoiTap(){
        return await this.QueryDB(`call API_Mobile_AnhGoiTap();`)
    }

    async API_Mobile_DanhSachBaiTap(){
        return await this.QueryDB(`call API_Mobile_DanhSachBaiTap();`)
    }

    async API_Mobile_BaiTap_ChiTiet(Id){
        return await this.QueryDB(`call API_Mobile_BaiTap_ChiTiet(${Id});`)
    }
    async API_Mobile_DanhSachGoiTap(){
        return await this.QueryDB(`call API_Mobile_DanhSachGoiTap();`)
    }

    async API_Mobile_GoiTap_ChiTiet(Id){
        return await this.QueryDB(`call API_Mobile_GoiTap_ChiTiet(${Id});`)
    }
    async API_NhuongQuyen_DangKyLienHe(HoTenLienHe, SoDienThoai, Email, DiaChi){
        return await this.QueryDB(`call API_NhuongQuyen_DangKyLienHe('${HoTenLienHe}','${SoDienThoai}','${Email}','${DiaChi}');`)
    }

    async API_Mobile_DangKyGoiTap(HoTenLienHe, SoDienThoai, NhuCauTapLuyen, TinhThanhId, CauLacBoId, NoiDungTinNhan, GoiTapId){
        return await this.QueryDB(`call API_Mobile_DangKyGoiTap('${HoTenLienHe}','${SoDienThoai}','${NhuCauTapLuyen}',${TinhThanhId},${CauLacBoId},'${NoiDungTinNhan}',${GoiTapId});`)
    }

    // cẩm nang dinh dưỡng

    async API_Mobile_CamNangDinhDuong_DanhSach(){
        return await this.QueryDB(`call API_Mobile_CamNangDinhDuong_DanhSach();`)
    }

    async API_Mobile_CamNangDinhDuong_TrangChu(){
        return await this.QueryDB(`call API_Mobile_CamNangDinhDuong_TrangChu();`)
    }

    async API_Mobile_CamNangDinhDuong_ChiTiet(Id){
        return await this.QueryDB(`call API_Mobile_CamNangDinhDuong_ChiTiet(${Id});`)
    }


    // Lịch sử cân đo

    async API_Mobile_ChiSoCoThe_Curves(Id){
        return await this.QueryDB(`call API_Mobile_ChiSoCoThe_Curves(${Id});`)
    }

    async API_Mobile_ChiSoCoThe(Id){
        return await this.QueryDB(`call API_Mobile_ChiSoCoThe(${Id});`)
    }

    async API_Mobile_LichSuCanDo(Id){
        return await this.QueryDB(`call API_Mobile_LichSuCanDo(${Id});`)
    }

    async API_Mobile_LichSuCanDo_ChiTiet(Id){
        return await this.QueryDB(`call API_Mobile_LichSuCanDo_ChiTiet(${Id});`)
    }

    async API_Mobile_ThemChiSoCoThe(Id, Ngay, CanNang, ChieuCao, LuongMoCoThe, MatDoCo, MatDoXuong, BMI, DCI, TuoiSinhHoc, LuongNuocCoThe, MoNoiTang, Nguc, Eo, Bung, Mong, Dui, Tay){
        return await this.QueryDB(`call API_Mobile_ThemChiSoCoThe(${Id}, '${Ngay}', '${CanNang}', '${ChieuCao}', '${LuongMoCoThe}', '${MatDoCo}', '${MatDoXuong}', '${BMI}', '${DCI}', '${TuoiSinhHoc}', '${LuongNuocCoThe}', '${MoNoiTang}', '${Nguc}', '${Eo}', '${Bung}', '${Mong}', '${Dui}', '${Tay}');`)
    }

   
    
}