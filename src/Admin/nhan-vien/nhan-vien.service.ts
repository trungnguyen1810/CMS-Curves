import { Injectable } from '@nestjs/common';

import {CoreService} from './../../baseservice/core.service';
@Injectable()
export class NhanVienService extends CoreService{
  

  async findAll() {
    return await this.QueryDB("CALL QuanLyNhanVien_GetAll()");
  }
  async getNhomQuyen() {
    return await this.QueryDB("select * from nhomquyen;");;
  }
  async getCauLacBo() {
    return await this.QueryDB("select * from caulacbo;");;
  }
  
  async Add_Edit(Id,HoTen,TenDangNhap,MatKhau,Email,SDT,TinhTrang,NhomQuyenId,CLBId,UserId){
    return await this.QueryDB(`CALL QuanLyNhanVien_Add_Edit(${Id},'${HoTen}','${TenDangNhap}','${MatKhau}','${Email}',
    '${SDT}',${TinhTrang},${NhomQuyenId},${CLBId},${UserId})`);
  }  
  async Delete(Id){
    return await this.QueryDB(`CALL QuanLyNhanVien_Delete(${Id});`);
  }
 
  async login(login :any){    
    return await this.QueryDB(`CALL QuanLyNhanVien_Login('${login.TenDangNhap}','${login.MatKhau}')`);
  }
  async getMenuUser(UserId){
    return await this.QueryDB(`CALL GetMenuByUser(${UserId})`);
  } 
  async GetHeader(UserId){
    return await this.QueryDB(`CALL GetDataHeader(${UserId})`);
  }

}