import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class QuanLyVoucherService extends CoreService {
    GetVoucher(UserId) {
        return this.QueryDB(`Call QuanLyVoucher_GetAll(${UserId});`);
    }

    GetSanPham() {
        return this.QueryDB('Call DanhSachSanPham_Voucher();');
    }

    Them_SuaVoucher(Id, MaVoucher, NgayHetHan, TinhTrang, LoaiMa, SoLuongNgay, SoTien, SanPhamId, TenSanPham, UserId){
        return this.QueryDB(`Call QuanLyVoucher_Add_Edit(${Id},'${MaVoucher}','${NgayHetHan}',${TinhTrang},${LoaiMa},${SoLuongNgay}, ${SoTien}, ${SanPhamId},'${TenSanPham}',${UserId});`);
      }

      API_Voucher_import(MaVoucher, LoaiMa, SoNgay, MaSanPham, SoTien, NgayHetHan, UserId){
        return  this.QueryDB(`call API_Voucher_import('${MaVoucher}', '${LoaiMa}', '${SoNgay}', '${MaSanPham}', '${SoTien}','${NgayHetHan}', ${UserId});`)
    }

    XoaVouCher(Id, UserId){
        return  this.QueryDB(`call XoaVouCher(${Id}, ${UserId});`)
    }
}
