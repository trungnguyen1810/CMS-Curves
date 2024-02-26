import { Injectable } from '@nestjs/common';
import {CoreService} from '../../baseservice/core.service';
@Injectable()
export class QuanLyKhachHangTiemNangService extends CoreService {

    async GetAll(userId){
        return this.QueryDB(`Call KhachHangTiemNang_GetAll(${userId});`)
    }

    async KhachHangTiemNang_Delete(Id){
        return this.QueryDB(`Call KhachHangTiemNang_Delete(${Id});`);
    }
    
    async KhachHangTiemNang_Insert(Id, HoVaTen,DiaChi, SoDienThoai,GioiTinh, TinhTrang, NguonKhachHangId, NgheNghiep, NguoiTaoId, ZaloFb, NhatKy, CauLacBoId, NgayTao){
        return this.QueryDB(`Call KhachHangTiemNang_Insert(${Id},'${HoVaTen}', '${DiaChi}', '${SoDienThoai}', ${GioiTinh}, ${TinhTrang}, ${NguonKhachHangId}, '${NgheNghiep}', ${NguoiTaoId}, '${ZaloFb}', '${NhatKy}', ${CauLacBoId}, '${NgayTao}');`);
    }

    async KhachHangTiemNang_Update(Id, HoVaTen,DiaChi, SoDienThoai,GioiTinh, TinhTrang, NguonKhachHangId, NgheNghiep, NguoiTaoId, ZaloFb, CauLacBoId, NgayTao){
        return this.QueryDB(`Call KhachHangTiemNang_Update(${Id}, '${HoVaTen}', '${DiaChi}', '${SoDienThoai}', ${GioiTinh}, ${TinhTrang}, ${NguonKhachHangId}, '${NgheNghiep}', ${NguoiTaoId}, '${ZaloFb}', ${CauLacBoId}, '${NgayTao}');`);
    }

    async KhachHangTiemNang_NguonKhachHang_GetAll(){
        return this.QueryDB(`Call KhachHangTiemNang_NguonKhachHang_GetALL();`);
    }

    DanhSachNhatKyTheoHoiVien(Id){
        return  this.QueryDB(`call DanhSachNhatKyTheoHoiVien(${Id});`)
    }

    async khachhang_tiemnam_insert_nhatky(UserId, KhachHangTiemNangId, ThoiGian, NoiDung){
        return this.QueryDB(`Call khachhang_tiemnam_insert_nhatky(${UserId}, ${KhachHangTiemNangId}, '${ThoiGian}', '${NoiDung}');`);
    }

    
    async khachhang_tiemnam_update_nhatky(Id, NoiDung){
        return this.QueryDB(`Call khachhang_tiemnam_update_nhatky(${Id},'${NoiDung}');`);
    }

    XoaNhatKyDiemCham(Id) {
        return this.QueryDB(`DELETE FROM khachhangtiemnang_diemcham WHERE Id = ${Id};`);
        }
}
