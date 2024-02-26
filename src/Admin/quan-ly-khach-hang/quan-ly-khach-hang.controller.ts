import { Controller, Get, Param, Post, Body, Put, Response, Request, UseInterceptors,UploadedFile, Delete } from '@nestjs/common';
import { CoreResponse } from './../../core.respone';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from './../../app.config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuanLyKhachHangService } from './quan-ly-khach-hang.service';
import * as Excel from 'exceljs';

@Controller('admin/khachhang')
export class QuanLyKhachHangController {
    private response: CoreResponse;
    constructor(private readonly quanlykhachangcService: QuanLyKhachHangService) {
        this.response = {};
    }
    @Get('getall')
    async FindAll(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.GetKH(UserId);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data={data:data[0]};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }
    @Post('getcogoitap')
    async FindAllCoGoiTap(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.GetKHCoGoiTap(UserId, body.CauLacBoId, body.GoiTapId, body.TinhTrang, body.TinhTrangTap);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data={data:data[0]};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }     
    }
    @Post('Add_Edit')
    async Edit(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.Them_SuaKH(body.Id,body.HoVaTen, body.SoDienThoai, body.Email, body.MatKhau, body.DiaChi, body.AnhDaiDien, body.AnhBia, body.TinhTrang, body.NgayBatDau, body.NgayKetThuc, body.CauLacBoId,body.GoiTapId, body.NgaySinh, body.SoThe, UserId, body.ZaloFb, body.NgheNghiep,body.GhiChu,body.LienLacKhanCap, body.TieuSuSucKhoe, body.NguonKhachHang, body.Voucher, body.PhiGiaNhap, body.NgayDangKy, body.TienDatCoc, body.SoNgayTang, body.ThuThach, body.TieuSu, body.HinhThucThanhToan);
            if(data[0][0].errorcode == 1) {
                this.response.errorcode=1;
                this.response.message=data[0][0].message,
                this.response.data={};
            }else{
                this.response.errorcode=0;
                this.response.message='thành công',
                this.response.data={};
            }
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Post('Add_Edit_CoGoiTap')
    async EditCoGoiTap(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.Them_SuaKHCoGoiTap(body.Id,body.HoVaTen, body.SoDienThoai, body.Email, body.MatKhau, body.DiaChi, body.AnhDaiDien, body.AnhBia, body.TinhTrang, body.NgayBatDau, body.NgayKetThuc, body.CauLacBoId,body.GoiTapId, body.NgaySinh, body.SoThe, UserId, body.ZaloFb, body.NgheNghiep,body.GhiChu,body.LienLacKhanCap, body.TieuSuSucKhoe, body.NguonKhachHang, body.NgayDangKy, body.ThuThach, body.TieuSu, body.Voucher, body.PhiGiaNhap, body.TienDatCoc, body.SoNgayTang,body.HinhThucThanhToan);
            if(data[0][0].errorcode == 1) {
                this.response.errorcode=1;
                this.response.message=data[0][0].message,
                this.response.data={};
            }else{
                this.response.errorcode=0;
                this.response.message='thành công',
                this.response.data={};
            }
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Post('ChangePass')
    async ChangePass(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.ChangePass(body.Id,body.MatKhau,UserId);

                this.response.errorcode=0;
                this.response.message='thành công',
                this.response.data={};
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Post('loadngayketthuc')
    async loadngayketthuc(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.loadngayketthuc(body.Id,body.NgayBatDau, body.SoNgayTang, body.Voucher);

                this.response.errorcode=0;
                this.response.message='thành công',
                this.response.data=data[0];
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Delete('delete/:id')
    async deleteTinTuc(@Param() params) {
        try {
            let data= await this.quanlykhachangcService.XoaKH(params.id);
            this.response.errorcode=0;
            this.response.message='Xóa thành công',
            this.response.data={};
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Get('getcaulacbo')
    async GetCauLacBo(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.GetCauLacBo(UserId);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }
    }

    @Get('GetCauLacBo_KhongPhanQuyen')
    async GetCauLacBo_KhongPhanQuyen(@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.GetCauLacBo_KhongPhanQuyen();
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }
    }
    @Get('getdanhsachgoitap')
    async DanhSachGoiTap(){
        try {
            let data= await this.quanlykhachangcService.DanhSachGoiTap();
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }
    }

    @Post('Import')
    async Import(@Body() body, @Request() req, @Response() res) {
        var workbook = new Excel.Workbook();
        let UserId = req.user.Id;
        let self = this;
        let data = {};
        try {
            workbook.xlsx.readFile(body.destination + '/' + body.filename)
                .then(async function () {

                    var ws = workbook.getWorksheet(1);
                    if (ws == null) {
                        throw new Error('File dữ liệu không đúng định dạng!');
                    }

                    if (ws.rowCount <= 1) {
                        throw new Error('File import không có dữ liệu');
                    }
                    // var checkFileEmpty = false;
                    // for (var i = 1; i <= ws.rowCount; i++) {
                    //     console.log(ws.getCell("A" + i).value );
                    //     if (ws.getCell("A" + i).value != null || ws.getCell("B" + i).value != null ||
                    //         ws.getCell("C" + i).value != null || ws.getCell("D" + i).value != null ||
                    //         ws.getCell("E" + i).value != null) {
                    //         checkFileEmpty = true;
                    //         break;
                    //     }
                    // }
                    var arr = [];
                    for (var i = 2; i <= ws.rowCount; i++) {

                        let HoTen, SoDienThoai, Email, SoThe, NgaySinh, DiaChi, MatKhau, MaCauLacBo, MaGoiTap, NgayBatDau, NgayKetThuc;

                        //    Id = ws.getCell("A" + i).value;
                        if (!ws.getCell("A" + i).value) {
                            HoTen = '';
                        } else {
                            HoTen = ws.getCell("A" + i).value;
                        }
                        if (!ws.getCell("B" + i).value) {
                            SoDienThoai = '';
                        } else {
                            SoDienThoai = ws.getCell("B" + i).value;
                        }
                        if (!ws.getCell("C" + i).value) {
                            Email = '';
                        } else {
                            Email = ws.getCell("C" + i).text;
                        }
                        if (!ws.getCell("D" + i).value) {
                            SoThe = '';
                        } else {
                            SoThe = ws.getCell("D" + i).text;
                        }
                        if (!ws.getCell("E" + i).value) {
                            NgaySinh = '';
                        } else {
                            NgaySinh = ws.getCell("E" + i).value;
                        }
                        if (!ws.getCell("F" + i).value) {
                            DiaChi = '';
                        } else {
                            DiaChi = ws.getCell("F" + i).value;
                        }
                        if (!ws.getCell("G" + i).value) {
                            MatKhau = '';
                        } else {
                            MatKhau = ws.getCell("G" + i).text;
                        }
                        if (!ws.getCell("H" + i).value) {
                            MaCauLacBo = '';
                        } else {
                            MaCauLacBo = ws.getCell("H" + i).value;
                        }
                        if (!ws.getCell("I" + i).value) {
                            MaGoiTap = '';
                        } else {
                            MaGoiTap = ws.getCell("I" + i).value;
                        }
                        if (!ws.getCell("J" + i).value) {
                            NgayBatDau = '';
                        } else {
                            NgayBatDau = ws.getCell("J" + i).value;
                        }
                        if (!ws.getCell("K" + i).value) {
                            NgayKetThuc = '';
                        } else {
                            NgayKetThuc = ws.getCell("K" + i).value;
                        }
                        
                        // var itemImport = {
                        //     STT: ws.getCell("A" + i).value + '',
                        //     SoDienThoai: ws.getCell("B" + i).value + '',
                        //     SoDiem: ws.getCell("C" + i).value + '',
                        //     NgayBatDau: ws.getCell("D" + i).value + '',
                        //     NgayKetThuc: ws.getCell("E" + i).value + ''
                        // }
                        // console.log(itemImport);

                        data = await self.quanlykhachangcService.API_KhachHang_import(HoTen, SoDienThoai, Email, SoThe, NgaySinh, 
                            DiaChi, MatKhau, MaCauLacBo, MaGoiTap, NgayBatDau, NgayKetThuc, UserId);
                        if (data[0][0].errorcode == 1) {
                            var a = {
                                HoTen: HoTen,
                                SoDienThoai: SoDienThoai,
                                Email: Email,
                                SoThe: SoThe,
                                NgaySinh: NgaySinh,
                                DiaChi: DiaChi,
                                MatKhau: MatKhau,
                                MaCauLacBo: MaCauLacBo,
                                MaGoiTap: MaGoiTap,
                                NgayBatDau: NgayBatDau,
                                NgayKetThuc: NgayKetThuc,
                                GhiChu: data[0][0].message
                            };
                            arr.push(a);
                        }
                    }
                    console.log(arr);

                    if (arr.length > 0) {
                        var workbook2 = new Excel.Workbook();
                        var worksheet2 = workbook2.addWorksheet('import_KhachHang_Loi', { properties: { tabColor: { argb: 'FF00FF00' } } });
                        worksheet2.columns = [
                            { header: 'STT', key: 'STT', width: 5 },
                            { header: 'Họ và Tên', key: 'HoTen', width: 15 },
                            { header: 'Số điện thoại', key: 'SoDienThoai', width: 15 },
                            { header: 'Email', key: 'Email', width: 15 },
                            { header: 'Số thẻ', key: 'SoThe', width: 15 },
                            { header: 'Ngày sinh', key: 'NgaySinh', width: 15 },
                            { header: 'Địa chỉ', key: 'DiaChi', width: 15 },
                            { header: 'Mật khẩu', key: 'MatKhau', width: 15 },
                            { header: 'Câu lạc bộ (mã)', key: 'MaCauLacBo', width: 15 },
                            { header: 'Gói tập (Mã)', key: 'MaGoiTap', width: 15 },
                            { header: 'Ngày bắt đầu', key: 'NgayBatDau', width: 15 },
                            { header: 'Ngày kết thúc', key: 'NgayKetThuc', width: 15 },
                            { header: 'Nội dung lỗi', key: 'GhiChu', width: 30 }
                        ];
                        var data_loi = arr;
                        var length = data_loi.length;
                        for (var i = 0; i < length; i++) {
                            var GhiChu = data_loi[i].GhiChu;
                            GhiChu = GhiChu.substring(0, GhiChu.length - 1);
                            var HoTen = data_loi[i].HoTen != 'null' ? data_loi[i].HoTen : '';
                            var SoDienThoai = data_loi[i].SoDienThoai != 'null' ? data_loi[i].SoDienThoai : '';
                            var Email = data_loi[i].Email != 'null' ? data_loi[i].Email : '';
                            var SoThe = data_loi[i].SoThe != 'null' ? data_loi[i].SoThe : '';
                            var NgaySinh = data_loi[i].NgaySinh != 'null' ? data_loi[i].NgaySinh : '';
                            var DiaChi = data_loi[i].DiaChi != 'null' ? data_loi[i].DiaChi : '';
                            var MatKhau = data_loi[i].MatKhau != 'null' ? data_loi[i].MatKhau : '';
                            var MaCauLacBo = data_loi[i].MaCauLacBo != 'null' ? data_loi[i].MaCauLacBo : '';
                            var MaGoiTap = data_loi[i].MaGoiTap != 'null' ? data_loi[i].MaGoiTap : '';
                            var NgayBatDau = data_loi[i].NgayBatDau != 'null' ? data_loi[i].NgayBatDau : '';
                            var NgayKetThuc = data_loi[i].NgayKetThuc != 'null' ? data_loi[i].NgayKetThuc : '';
                          
                            var LyDo = data_loi[i].GhiChu != 'null' ? data_loi[i].GhiChu : '';
                            worksheet2.addRow({
                                STT: (i + 1),   
                                HoTen: HoTen,
                                SoDienThoai: SoDienThoai,
                                Email: Email,
                                SoThe: SoThe,
                                NgaySinh: NgaySinh,
                                DiaChi: DiaChi,
                                MatKhau: MatKhau,
                                MaCauLacBo: MaCauLacBo,
                                MaGoiTap: MaGoiTap,
                                NgayBatDau: NgayBatDau,
                                NgayKetThuc: NgayKetThuc,
                                GhiChu: LyDo
                            });
                        }
                        var date = new Date();
                        var filename = 'Import_KhachHang_FileLoi_' + date.getTime() + '.xlsx';
                        var thucmuc = AppConfig.Dir_upload+'/importloi/' + filename;
                        
                        workbook2.xlsx.writeFile(thucmuc)
                            .then(function () {
                                self.response.errorcode = -1;
                                self.response.message = 'Có lỗi xảy ra, vui lòng xem file lỗi',
                                self.response.data = data[0][0];
                                res.send({ errorcode: -1, message: 'Có lỗi xảy ra, vui lòng xem file lỗi', file: '/upload/importloi/'+filename});
                                return;
                            });
                    }else {
                        self.response.errorcode = 0;
                        self.response.message = 'thành công',
                        self.response.data = data[0][0];
                        res.send({ errorcode: 0, message: 'Import thành công', data: {errorcode : 0, message:'Import thành công' } });
                        return;
                    }
                   
                })

        } catch (error) {
            this.response.errorcode = 1;
            this.response.message = 'có lỗi xảy ra :' + error.toString(),
                this.response.data = {};
            return this.response;
        }
    }

    @Post('khachhang_tudo_insert')
    async khachhang_tudo_insert(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.khachhang_tudo_insert(UserId,body.Id,body.TuNgay,body.DenNgay, body.GiaTien, body.TuDoId, body.KhachHangTuDoId, body.HinhThucThanhToan, body.NgayThueTu);

                this.response.errorcode=0;
                this.response.message='thành công',
                this.response.data=data[0][0];
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Post('khachhang_baoluu_inser')
    async khachhang_baoluu_inser(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.khachhang_baoluu_inser(body.IdBaoLuu,body.Id,body.TuNgay,body.DenNgay,UserId);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Post('khachang_chuyenphongtap_inser')
    async khachang_chuyenphongtap_inser(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.khachang_chuyenphongtap_inser(body.Id,body.clbDen,body.SoTien,UserId);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Post('HuyKhachHang_TaoVoucher')
    async HuyKhachHang_TaoVoucher(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.HuyKhachHang_TaoVoucher(body.Id,body.NgayHetHan, body.SoLuongNgay, body.SoTien, body.LyDo, UserId);
           
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0][0];
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Post('ChiTietHuyThanhVien')
    async ChiTietHuyThanhVien(@Body() body,@Request() req){
        try {
            let data= await this.quanlykhachangcService.ChiTietHuyThanhVien(body.Id);
           
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0][0];
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    
    @Post('DanhSachThueTuDoTheoHoiVien')
    async DanhSachThueTuDoTheoHoiVien(@Body() body,@Request() req){
        try {
            let data= await this.quanlykhachangcService.DanhSachThueTuDoTheoHoiVien(body.Id);
           
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data={data: data};
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Post('DanhSachGoiTapHoiVien')
    async DanhSachGoiTapHoiVien(@Body() body,@Request() req){
        try {
            let data= await this.quanlykhachangcService.DanhSachGoiTapHoiVien(body.Id);
           
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data={data: data};
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }

    @Post('DanhSachTuDoTheoCLB')
    async DanhSachTuDoTheoCLB(@Body() body,@Request() req){
        try {
            let data= await this.quanlykhachangcService.DanhSachTuDoTheoCLB(body.Id, body.TuNgay, body.DenNgay);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }
    }
    @Post('DanhSachSanPhamDaMua')
    async DanhSachSanPhamDaMua(@Body() body,@Request() req){
        try {
            let UserId = req.user.Id;
            let data= await this.quanlykhachangcService.DanhSachSanPhamDaMua(body.Id,UserId);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }
    }
    @Get('QuanLyHoiVien_GetSucKhoe')
    async QuanLyHoiVien_GetSucKhoe(@Body() body,@Request() req){
        try {
            let UserId = req.user.Id;
            let data= await this.quanlykhachangcService.QuanLyHoiVien_GetSucKhoe();
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data[0];
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }
    }

    @Post('khachhang_tudo_delete')
    async khachhang_tudo_delete(@Body() body,@Request() req){
        let UserId = req.user.Id;
        let KhachHangId = body.KhachHangId;
        let KhachHangTuDoId = body.Id;
        try {
            let data= await this.quanlykhachangcService.khachhang_tudo_delete(UserId,KhachHangId,KhachHangTuDoId);
            this.response.errorcode=0;
            this.response.message='success';            
            this.response.data={};            
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }

    @Post('ThemMoiLichSuThanhToanGoiTap')
    async ThemMoiLichSuThanhToanGoiTap(@Body() body,@Request() req){
        let UserId = req.user.Id;
        let KhachHangId = body.KhachHangId;       
       
        try {
            let data= await this.quanlykhachangcService.ThemMoiLichSuThanhToanGoiTap(body.Id,UserId,KhachHangId,body.KhachHangGoiTapId,body.MaVoucher,body.GiaTriVoucher,
                body.GiaTien,body.HinhThucThanhToan,body.NgayHenTra, body.NgayThanhToan);

            this.response.errorcode=0;
            this.response.message='success';            
            this.response.data="";            
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString();
            this.response.data={};
            return this.response;
        }        
    }

    @Post('DanhSachThanhToanTheoDot_KhachHang')
    async DanhSachThanhToanTheoDot_KhachHang(@Body() body,@Request() req){
        try {
            let UserId = req.user.Id;
            let data= await this.quanlykhachangcService.DanhSachThanhToanTheoDot_KhachHang(body.Id,body.KhachHangGoiTapId);
            this.response.errorcode=0;
            this.response.message='thành công',
            this.response.data=data;
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        }
    }

    @Post('XoaThanhToanGoiTap')
    async XoaThanhToanGoiTap(@Body() body,@Request() req){
        let UserId = req.user.Id;
        try {
            let data= await this.quanlykhachangcService.XoaThanhToanGoiTap(body.Id,body.KhachHangId);

                this.response.errorcode=0;
                this.response.message='thành công',
                this.response.data={};
           
            return this.response;
        } catch (error) {
            this.response.errorcode=1;
            this.response.message='có lỗi xảy ra :'+error.toString(),
            this.response.data={};
            return this.response;
        } 
    }
}
