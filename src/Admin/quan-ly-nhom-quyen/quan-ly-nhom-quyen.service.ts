import { Injectable } from '@nestjs/common';
import {CoreService} from './../../baseservice/core.service';

@Injectable()
export class QuanLyNhomQuyenService extends CoreService{
    

    async findAll() {
        return await this.QueryDB('call QuanLyNhomQuyen_GetAll();')
    }
    async getAllMenu(){
        return await this.QueryDB('call QuanLyNhomQuyen_GetAllMenu();')
    }
    async Edit(Id,MaNhomQuyen,TenNhomQuyen,TinhTrang,MoTa,ListMenuId,UserId){
        return await this.QueryDB(`call QuanLyNhomQuyen_Edit(${Id},'${MaNhomQuyen}','${TenNhomQuyen}',${TinhTrang},'${MoTa}','${ListMenuId}',${UserId});`)
    }
    async GetNhomQuyenMenu(NhomQuyenId){
        return await this.QueryDB(`call QuanLyNhomQuyen_GetNhomQuyenMenu(${NhomQuyenId});`);
    }
    async XoaNhomQuyen(NhomQuyenId){
        return await this.QueryDB(`call QuanLyNhomQuyen_XoaNhomQuyen(${NhomQuyenId});`);
    }
}
