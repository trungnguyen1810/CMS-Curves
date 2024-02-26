import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class ThucDonThamKhaoService extends CoreService {
    GetALL() {
        return this.QueryDB('Call ThucDonThamKhao_GetAll();');
    }

    ThemMoiThucDon(Ngay,BuaId,MonAnId,SoLuong, UserId){
        return  this.QueryDB(`call ThucDonThamKhao_ThemMoi('${Ngay}', ${BuaId}, ${MonAnId}, '${SoLuong}',${UserId});`)
    }
    ThucDonThamKhao_Check_ThemMoi_Edit(Ngay,BuaId,IsAdd,CurrentBuaId){
        return  this.QueryDB(`call ThucDonThamKhao_Check_ThemMoi_Edit('${Ngay}', ${BuaId}, ${IsAdd},${CurrentBuaId});`)
    }
    
    Delete(Ngay,BuaId) {
        return this.QueryDB(`DELETE FROM thucdonthamkhao1 WHERE NgayThamKhao = '${Ngay}' and BuaId = ${BuaId};`);
    }
    GetDonVi(){
        return this.QueryDB(`Call QuanLyMonAn_GetDonViTinh();`);
    }
    GetMonAn(){
        return this.QueryDB(`Call API_Mobile_GetDanhSachMonAn();`);
    }
    XemChiTiet(Ngay,BuaId){
        return this.QueryDB(`Call ThucDonThamKhao_XemChiTiet('${Ngay}',${BuaId});`);
    }
    getMonAnEdit(Ngay,BuaId){
        return this.QueryDB(`Call ThucDonThamKhao_GetDanhSachMonAnEdit('${Ngay}',${BuaId});`);
    }
    GetDanhSachBuaAnTheoNgay(Ngay){
        return this.QueryDB(`select Id,TenBuaAn,ThuTuSapXep,date_format(NgayThamKhao,'%d/%m/%Y') 
        as NgayThamKhao from thamkhao_ngay_buaan where NgayThamKhao = '${Ngay}' AND HoiVienId = 0 order by ThuTuSapXep asc;`);
    }
    ThemMoiTenBuaAnTheoNgay(Ngay,TenBuaAn){
        return this.QueryDB(`Call QuanLyThucDonThamKhao_ThemMoiTenBuaAnTheoNgay('${Ngay}','${TenBuaAn}');`);
        
    }
    EditTenBuaAnTheoNgay(TenBuaAn,ThuTuSapXep,Id){
        return this.QueryDB(`Call ThucDonThamKhao_EditTenBuaAnTheoNgay('${TenBuaAn}','${ThuTuSapXep}',${Id});`);        
    }
    XoaBuaAnTheoNgay(Id){
        return this.QueryDB(`Call ThucDonThamKhao_XoaBuaAnTheoNgay(${Id});`);   
    }
    CopyThucDon(TuNgay,SangNgay){
        return this.QueryDB(`Call ThucDonThamKhao_CloneDanhSachTheoNgay('${TuNgay}','${SangNgay}');`);  
         
    }
}
