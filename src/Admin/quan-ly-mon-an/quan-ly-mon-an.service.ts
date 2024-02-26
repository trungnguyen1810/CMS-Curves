import { Injectable } from '@nestjs/common';
import {CoreService} from '../../baseservice/core.service';
@Injectable()
export class QuanLyMonAnService extends CoreService {
    GetALL() {
        return this.QueryDB('Call MonAn_GetAll();');
    }
    Add_Edit(Id,TenMonAn,KhoiLuong,SoLuong,MoTa,CaLo,UserId){
        return this.QueryDB(`Call QuanLyMonAn_Add_Edit(${Id},'${TenMonAn}',${KhoiLuong},'${SoLuong}','${MoTa}',${CaLo},${UserId});`)

    }
    GetMonAnPhu(){
        return this.QueryDB('Call MonAn_GetMonAnPhu();');
    }
    MonAn_Them_Sua(Id, TenMonAn, DonViId, CaLo, MoTa, UserId){
        return  this.QueryDB(`call MonAn_Them_Sua(${Id}, '${TenMonAn}', ${DonViId}, '${CaLo}', '${MoTa}',${UserId});`)
    }
    MonAn_Them_Sua_Import(TenMonAn, TenDonVi, CaLo, MoTa, UserId){
        return  this.QueryDB(`call MonAn_Them_Sua_Import( '${TenMonAn}', '${TenDonVi}', '${CaLo}', '${MoTa}',${UserId});`)
    }
    Delete(Id) {
        return this.QueryDB(`DELETE FROM monan1 WHERE Id = ${Id};`);
    }
    GetDonVi(){
        return this.QueryDB(`Call QuanLyMonAn_GetDonViTinh();`);
    }
    ChuyenMonAn(Id,UserId){
        return this.QueryDB(`update monan1 set HoiVienId = 0 ,NgayCapNhat = now(),NguoiCapNhatId = ${UserId} where Id = ${Id};`);
    }
    DeleteNhieuMonAn(strId) {
        return this.QueryDB(`DELETE FROM monan1 WHERE FIND_IN_SET(Id,'${strId}');`);
    }
}
