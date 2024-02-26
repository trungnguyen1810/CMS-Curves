
import { Injectable } from '@nestjs/common';
import { CoreService } from '../../baseservice/core.service';

@Injectable()
export class BaoCaoQuanLyCanDoService extends CoreService {
    DanhSachHoiVienTangGiamCan(tungay,denngay,caulacboid) {
        return this.QueryDB(`Call BaoCao9_DanhSachHoiVienTangGiamCan('${tungay}','${denngay}','${caulacboid}');`);
    }
    DanhSachHoiVienTreHen(userid,caulacboid){
        return this.QueryDB(`Call BaoCaoDanhSachKhachHangTreHenCanDo(${userid},'${caulacboid}');`);

    }
    DanhSachHoiVienCoLichCanDo(userid,caulacboid,tungay,denngay){
        return this.QueryDB(`Call BaoCaoDanhSachKhachHangCoLichCanDo(${userid},'${caulacboid}','${tungay}','${denngay}');`);

    }
    DanhSachCauLacBo(userid){
        return this.QueryDB(`Call BaoCao_GetDanhSachCauLacBo(${userid});`);

    }
    BaoCaoXuatTonKho(caulacboid,tungay,denngay){
        return this.QueryDB(`Call BaoCaoTonKhoTheoCauLacBo('${caulacboid}','${tungay}','${denngay}');`);
    }
    TimKiemDoanhThu(tungay,denngay,caulacboid,loaithanhtoan){
        return this.QueryDB(`Call BaoCaoDoanhThuTheoCauLacBo('${tungay}','${denngay}','${caulacboid}','${loaithanhtoan}');`);
    }
    BaoCaoBienDongCanDo(TuNgay,DenNgay,UserId){
        return this.QueryDB(`Call BaoCaoBienDongCanDo('${TuNgay}','${DenNgay}',${UserId});`);

    }
}

