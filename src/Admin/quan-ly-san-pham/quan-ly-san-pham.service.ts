import { Injectable } from '@nestjs/common';
import {CoreService} from '../../baseservice/core.service';
@Injectable()
export class QuanLySanPhamService extends CoreService {

    async GetAll(userId){
        return this.QueryDB(`Call QuanLySanPham_GetAll(${userId});`)
    }
    async getChiTiet(Id){
        return this.QueryDB(`Call QuanLySanPham_GetChiTiet(${Id});`)
    }
    async Add_Edit(Id,TenSanPham,DanhMucSanPhamId,AnhDaiDien,AnhChiTiet,Gia,HienThi,UserId,MoTa,Color,Size,ChatLieu,ConHang){
        return this.QueryDB(`Call QuanLySanPham_Add_Edit(${Id},'${TenSanPham}',${DanhMucSanPhamId},'${AnhDaiDien}',
        '${AnhChiTiet}',${Gia},${HienThi},${UserId},'${MoTa}','${Color}','${Size}','${ChatLieu}',${ConHang});`)
    }
    async Add_Edit_ThongSoKyThuat(Id, ThongSoKyThuatId) {
        let list = [];
        for (let i = 0; i < ThongSoKyThuatId.length; i++) {
            let ThuocTinhId = ThongSoKyThuatId[i].Id;
            list.push(ThuocTinhId);           
        }
        return this.QueryDB(`CALL QuanLySanPham_Add_Edit_ThongSoKyThuat(${Id},'${list.toString()}');`);
    }
    async Edit_AnhChiTiet(Id, AnhChiTiet,STT) {
        
        return this.QueryDB(`CALL QuanLySanPham_Add_Edit_Edit_AnhChiTiet(${Id},'${AnhChiTiet}',${STT});`);
    }
    async XoaSanPham(Id){
        return this.QueryDB(`delete from sanpham where Id = ${Id};`);
    }

    async Add_SoLuong(Id,SoLuongThem, SoLuongBot, UserId){
        return this.QueryDB(`Call QuanLySanPham_Add_SoLuong(${Id},${SoLuongThem},${SoLuongBot},${UserId});`)
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
    
}
